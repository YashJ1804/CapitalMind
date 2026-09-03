const Portfolio = require("../models/Portfolio");
const { getQuote } = require("../tools/financialTool");
const { getCompanyProfile } = require("../tools/companyTool");
const ApiError = require("../utils/apiError");
const HTTP_STATUS = require("../constants/httpStatus");

const getEnrichedPortfolio = async (userId) => {

    const portfolio = await Portfolio.findOne({
        user: userId
    });

    if (!portfolio || portfolio.holdings.length === 0) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "Portfolio is empty.",
            "EMPTY_PORTFOLIO"
        );
    }

    return Promise.all(

        portfolio.holdings.map(async (holding) => {

            const [quote, profile] = await Promise.all([
                getQuote(holding.symbol),
                getCompanyProfile(holding.symbol)
            ]);

            const investedValue =
                holding.averagePrice * holding.quantity;

            const currentValue =
                quote.currentPrice * holding.quantity;

            return {
                symbol: holding.symbol,
                companyName: holding.companyName,
                quantity: holding.quantity,
                averagePrice: holding.averagePrice,
                currentPrice: quote.currentPrice,
                investedValue,
                currentValue,
                profit: currentValue - investedValue,
                profitPercentage:
                    investedValue === 0
                        ? 0
                        : (
                            (currentValue - investedValue) /
                            investedValue
                        ) * 100,
                profile
            };
        })
    );
};

module.exports = {
    getEnrichedPortfolio
};