const portfolioAIService = require("../services/portfolioAIService");
const ApiResponse = require("../utils/apiResponse");

const analyzePortfolio = async (req, res, next) => {
    try {

        const result = await portfolioAIService.analyzeUserPortfolio(
            req.user.id
        );

        return ApiResponse.success(
            res,
            result,
            "Portfolio analysis generated successfully."
        );

    } catch (error) {
        next(error);
    }
};

module.exports = {
    analyzePortfolio
};