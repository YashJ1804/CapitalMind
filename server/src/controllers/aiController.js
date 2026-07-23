const aiService = require("../services/aiService");

const ApiResponse = require("../utils/apiResponse");

const MESSAGES = require("../constants/messages");

const analyzeStock = async (req, res, next) => {
    try {
        const {
            company,
            risk = "Moderate"
        } = req.body;

        const result = await aiService.analyzeStock(
            company,
            risk
        );

        return ApiResponse.success(
            res,
            result,
            MESSAGES.STOCK_ANALYSIS
        );

    } catch (error) {
        next(error);
    }
};

module.exports = {
    analyzeStock
};