const Portfolio = require("../models/Portfolio");
const { getQuote } = require("../tools/financialTool");
const { getCompanyProfile } = require("../tools/companyTool");
const ApiError = require("../utils/apiError");
const HTTP_STATUS = require("../constants/httpStatus");

const getEnrichedPortfolio = async (userId) => {

    const holdings = await Portfolio.find({ user: userId });

    if (!holdings.length) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "Portfolio is empty.",
            "EMPTY_PORTFOLIO"
        );
    }

    return Promise.all(

        holdings.map(async (holding) => {

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

                quantity: holding.quantity,

                averagePrice: holding.averagePrice,

                currentPrice: quote.currentPrice,

                investedValue,

                currentValue,

                profit: currentValue - investedValue,

                profitPercentage:
                    investedValue === 0
                        ? 0
                        : ((currentValue - investedValue) /
                            investedValue) * 100,

                profile

            };

        })

    );

};

module.exports = {
    getEnrichedPortfolio
};