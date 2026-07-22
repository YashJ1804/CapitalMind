const VALID_RECOMMENDATIONS = [
    "BUY",
    "HOLD",
    "PASS"
];

function validateInvestmentAnalysis(result) {

    if (!result.company) {
        throw new Error("Company is missing.");
    }

    if (
        !VALID_RECOMMENDATIONS.includes(result.recommendation)
    ) {
        throw new Error("Invalid recommendation.");
    }

    if (typeof result.score !== "number") {
        throw new Error("Invalid score.");
    }

    if (typeof result.confidence !== "number") {
        throw new Error("Invalid confidence.");
    }

    return result;
}

module.exports = {
    validateInvestmentAnalysis
};