const geminiService =
    require("../services/geminiService");

const {
    calculateIndianMarketMetrics
} = require("../utils/indianMarketMetrics");


// ============================================================
// Indian Company Analysis
// ============================================================

const analyzeIndianCompany = async (data) => {

    if (!data?.company || !data?.market) {

        throw new Error(
            "Indian company analysis data is incomplete."
        );

    }


    // ========================================================
    // Calculate deterministic technical metrics
    // ========================================================

    const historyData =
        data.company.history?.history ||
        data.company.history ||
        [];


    const metrics =
        calculateIndianMarketMetrics(
            historyData
        );


    // ========================================================
    // Gemini Prompt
    // ========================================================

    const prompt = `

You are a professional Indian equity research analyst.

Analyze the following Indian company using ONLY the
information provided below.

Do not invent financial data.

Do not assume facts that are not provided.

Your analysis must specifically consider the Indian
stock market context.

============================================================
COMPANY
============================================================

Symbol:
${data.company.symbol}


Current Quote:
${JSON.stringify(
    data.company.quote,
    null,
    2
)}


Historical Data:
${JSON.stringify(
    data.company.history,
    null,
    2
)}


============================================================
INDIAN MARKET
============================================================

${JSON.stringify(
    data.market,
    null,
    2
)}


============================================================
CALCULATED TECHNICAL METRICS
============================================================

${JSON.stringify(
    metrics,
    null,
    2
)}


============================================================
ANALYSIS REQUIREMENTS
============================================================

Evaluate the company using:

1. Current price movement

2. Historical price trend

3. Period return

4. Volatility

5. Maximum drawdown

6. Current technical trend

7. Performance relative to the Indian market

8. Short-term momentum

9. Bullish factors

10. Bearish factors

11. Key risks

12. Overall Indian market context


============================================================
REASONING REQUIREMENT
============================================================

Explain clearly WHY the recommendation is being made.

The reasoning should connect:

- Current price
- Historical trend
- Technical metrics
- Market conditions
- Risk factors
- Indian market context

Do not simply repeat the summary.

============================================================
FUTURE OUTLOOK
============================================================

Provide a concise forward-looking assessment based ONLY
on the supplied data.

Discuss:

- Near-term outlook
- Current momentum
- Potential upside factors
- Potential downside factors
- Important conditions that could change the view

Do not make guaranteed price predictions.

============================================================
RECOMMENDATION
============================================================

Choose exactly ONE:

BUY
HOLD
PASS

The recommendation must be appropriate for the Indian
equity market.

============================================================
OUTPUT FORMAT
============================================================

Return ONLY valid JSON.

Use exactly this structure:

{
    "recommendation": "BUY | HOLD | PASS",

    "confidence": 0,

    "summary": "",

    "reasoning": "",

    "pros": [],

    "cons": [],

    "risks": [],

    "outlook": "",

    "marketContext": "",

    "technicalContext": {
        "trend": "",
        "periodReturn": 0,
        "volatility": 0,
        "drawdown": 0
    }
}

============================================================
FIELD REQUIREMENTS
============================================================

recommendation:
Must be exactly BUY, HOLD, or PASS.

confidence:
Integer from 0 to 100.

summary:
A concise investment summary.

reasoning:
A detailed explanation of why the recommendation was made.

pros:
List of important positive factors.

cons:
List of important negative factors.

risks:
List of important investment risks.

outlook:
Forward-looking assessment based on the available data.

marketContext:
Explain how the broader Indian market affects the company.

technicalContext:
Use the calculated metrics provided above.

Do not invent technical values.

Do not include markdown.

Do not include text outside the JSON.
`;


    // ========================================================
    // Gemini Request
    // ========================================================

    try {

        const response =
            await geminiService.generateContent(
                prompt
            );


        let text =
            response?.text ||
            response;


        if (typeof text !== "string") {

            throw new Error(
                "Invalid Gemini response."
            );

        }


        // ====================================================
        // Clean Gemini response
        // ====================================================

        text = text
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();


        // ====================================================
        // Parse JSON
        // ====================================================

        const analysis =
            JSON.parse(text);


        // ====================================================
        // Normalize response
        // ====================================================

        return {

            recommendation:
                analysis.recommendation ||
                "HOLD",

            confidence:
                Number(
                    analysis.confidence
                ) || 0,

            summary:
                analysis.summary ||
                "",

            reasoning:
                analysis.reasoning ||
                "",

            pros:
                Array.isArray(
                    analysis.pros
                )
                    ? analysis.pros
                    : [],

            cons:
                Array.isArray(
                    analysis.cons
                )
                    ? analysis.cons
                    : [],

            risks:
                Array.isArray(
                    analysis.risks
                )
                    ? analysis.risks
                    : [],

            outlook:
                analysis.outlook ||
                "",

            marketContext:
                analysis.marketContext ||
                "",

            technicalContext:
                {

                    trend:
                        analysis.technicalContext
                            ?.trend ||
                        metrics.trend ||
                        "UNKNOWN",

                    periodReturn:
                        Number(
                            analysis.technicalContext
                                ?.periodReturn
                        ) ||
                        metrics.periodReturn ||
                        0,

                    volatility:
                        Number(
                            analysis.technicalContext
                                ?.volatility
                        ) ||
                        metrics.volatility ||
                        0,

                    drawdown:
                        Number(
                            analysis.technicalContext
                                ?.drawdown
                        ) ||
                        metrics.drawdown ||
                        0

                }

        };


    } catch (error) {

        console.error(
            "Indian Decision Agent Error:",
            error.message
        );


        throw new Error(
            "Failed to analyze Indian company."
        );

    }

};


module.exports = {

    analyzeIndianCompany

};