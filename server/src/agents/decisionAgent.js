const { generateContent } = require("../services/geminiService");

const makeInvestmentDecision = async (
    profile,
    quote,
    news = [],
    risk
) => {

    const newsSection =
        news && news.length > 0
            ? JSON.stringify(news, null, 2)
            : "No recent news available.";

    const prompt = `
You are Warren Buffett and a senior investment analyst.

Analyze the company using the company profile, live market data, and the latest news.

==============================
COMPANY PROFILE
==============================

${JSON.stringify(profile, null, 2)}

==============================
MARKET DATA
==============================

${JSON.stringify(quote, null, 2)}

==============================
RECENT NEWS
==============================

${newsSection}

==============================
TASK
==============================

Evaluate:

1. Business Quality
2. Competitive Advantage (Moat)
3. Financial Strength
4. Current Market Performance
5. Impact of Recent News
6. Long-Term Growth Potential
7. Investment Risks

Recommendation MUST be one of:

BUY
HOLD
PASS

Return ONLY valid JSON.

{
  "company": "",
  "summary": "",
  "recommendation": "",
  "score": 0,
  "confidence": 0,
  "riskLevel": "",
  "investmentHorizon": "",
  "investorType": "",
  "sectorOutlook": "",
  "volatility": "",
  "pros": [],
  "cons": [],
  "risks": [],
  "futureOutlook": "",
  "reasoning": ""
}
`;

    let text = await generateContent(prompt);

    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");
    text = text.trim();

    try {
        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini Response:");
        console.log(text);
        throw new Error("Gemini returned invalid JSON.");
    }
};

module.exports = {
    makeInvestmentDecision
};