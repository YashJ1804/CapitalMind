const { generateContent } = require("../services/geminiService");

const { buildDecisionPrompt } = require("./decisionPrompt");
const { parseAIResponse } = require("./jsonParser");
const { validateInvestmentAnalysis } = require("./aiValidator");

const makeInvestmentDecision = async (
    profile,
    quote,
    news = [],
    risk = "Moderate"
) => {

    // Build the prompt
    const prompt = buildDecisionPrompt(
        profile,
        quote,
        news,
        risk
    );

    // Generate AI response
    const text = await generateContent(prompt);

    // Parse the JSON response
    const result = parseAIResponse(text);

    // Validate and return
    return validateInvestmentAnalysis(result);
};

module.exports = {
    makeInvestmentDecision
};