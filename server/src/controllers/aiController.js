const aiService = require("../services/aiService");

const ApiResponse = require("../utils/apiResponse");

const analyzeStock = async (req, res, next) => {

    try {

        const { company, risk } = req.body;

        const result = await aiService.analyzeStock(

            company,

            risk

        );

        return ApiResponse.success(

            res,

            result,

            "Stock analysis generated successfully."

        );

    } catch (error) {

        next(error);

    }

};

module.exports = {

    analyzeStock

};