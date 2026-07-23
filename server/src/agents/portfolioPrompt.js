const buildPortfolioPrompt = (portfolio) => {

    return `
You are a professional financial advisor.

Analyze the following investment portfolio.

Portfolio:

${JSON.stringify(portfolio, null, 2)}

Return ONLY valid JSON.

{
    "portfolioScore": number,
    "riskLevel": "",
    "diversificationScore": number,
    "strengths": [],
    "weaknesses": [],
    "recommendations": []
}
`;

};

module.exports = {
    buildPortfolioPrompt
};