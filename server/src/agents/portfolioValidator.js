const validatePortfolioAnalysis = (result) => {

    if (!result || typeof result !== "object") {
        throw new Error("Invalid portfolio analysis.");
    }

    const requiredFields = [
        "portfolioScore",
        "riskLevel",
        "diversificationScore",
        "strengths",
        "weaknesses",
        "recommendations"
    ];

    for (const field of requiredFields) {
        if (!(field in result)) {
            throw new Error(`Missing field: ${field}`);
        }
    }

    return result;
};

module.exports = {
    validatePortfolioAnalysis
};