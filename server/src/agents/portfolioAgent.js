const { generateContent } = require("../services/geminiService");
const { buildPortfolioPrompt } = require("./portfolioPrompt");
const { parseAIResponse } = require("./jsonParser");
const { validatePortfolioAnalysis } = require("./portfolioValidator");

const analyzePortfolio = async (portfolio) => {

    const prompt = buildPortfolioPrompt(portfolio);

    const aiResponse = await generateContent(prompt);

    const parsedResult = parseAIResponse(aiResponse);

    return validatePortfolioAnalysis(parsedResult);
};

module.exports = {
    analyzePortfolio
};