const { analyzePortfolio } = require("../agents/portfolioAgent");
const { getEnrichedPortfolio } = require("./portfolioDataService");
const ApiError = require("../utils/apiError");
const HTTP_STATUS = require("../constants/httpStatus");

const analyzeUserPortfolio = async (userId) => {

    try {

        const enrichedPortfolio = await getEnrichedPortfolio(userId);

        const totalValue = enrichedPortfolio.reduce(

            (sum, stock) => sum + stock.currentValue,

            0

        );

        const portfolioData = {

            totalValue,

            holdings: enrichedPortfolio

        };

        const analysis = await analyzePortfolio(portfolioData);

        return {

            portfolio: {

                totalValue,

                holdings: enrichedPortfolio

            },

            analysis

        };

    } catch (error) {

        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError(
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            "Failed to analyze portfolio.",
            "PORTFOLIO_ANALYSIS_FAILED"
        );

    }

};

module.exports = {
    analyzeUserPortfolio
};