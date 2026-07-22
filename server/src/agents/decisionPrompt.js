const buildDecisionPrompt = (
    profile,
    quote,
    news = [],
    risk = "Moderate"
) => {

    const newsSection =
        news.length > 0
            ? JSON.stringify(news, null, 2)
            : "No recent news available.";

    return `
You are Warren Buffett and a senior investment analyst.

Analyze the company using:

• Company Profile
• Live Market Data
• Recent News
• Investor Risk Appetite

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
INVESTOR PROFILE
==============================

Risk Appetite:
${risk}

==============================
TASK
==============================

Evaluate:

1. Business Quality
2. Competitive Advantage
3. Financial Strength
4. Current Market Performance
5. News Impact
6. Long-Term Growth
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
};

module.exports = {
    buildDecisionPrompt
};