const portfolioRepository = require("../repositories/portfolioRepository");
const ApiError = require("../utils/apiError");
const HTTP_STATUS = require("../constants/httpStatus");
const { getQuote } = require("../tools/financialTool");

class PortfolioService {

    async getPortfolio(userId) {
        let portfolio = await portfolioRepository.findByUser(userId);

        if (!portfolio) {
            portfolio = await portfolioRepository.create(userId);
        }

        return portfolio;
    }

    async addHolding(userId, holdingData) {
        const portfolio = await this.getPortfolio(userId);

        const existingHolding = portfolio.holdings.find(
            (holding) =>
                holding.symbol === holdingData.symbol.trim().toUpperCase()
        );

        if (existingHolding) {
            throw new ApiError(
                HTTP_STATUS.CONFLICT,
                "Stock already exists in portfolio",
                "HOLDING_ALREADY_EXISTS"
            );
        }

        portfolio.holdings.push({
            ...holdingData,
            symbol: holdingData.symbol.trim().toUpperCase()
        });

        return portfolioRepository.save(portfolio);
    }

    async updateHolding(userId, holdingId, holdingData) {
        const portfolio = await this.getPortfolio(userId);

        const holding = portfolio.holdings.id(holdingId);

        if (!holding) {
            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Holding not found",
                "HOLDING_NOT_FOUND"
            );
        }

        if (holdingData.quantity !== undefined) {
            holding.quantity = holdingData.quantity;
        }

        if (holdingData.averagePrice !== undefined) {
            holding.averagePrice = holdingData.averagePrice;
        }

        if (holdingData.purchaseDate !== undefined) {
            holding.purchaseDate = holdingData.purchaseDate;
        }

        if (holdingData.sector !== undefined) {
            holding.sector = holdingData.sector;
        }

        if (holdingData.industry !== undefined) {
            holding.industry = holdingData.industry;
        }

        return portfolioRepository.updateHolding(portfolio);
    }

    async getPortfolioSummary(userId) {

        const portfolio = await portfolioRepository.findByUserWithHoldings(userId);

        if (!portfolio) {
            return {
                summary: {
                    totalInvestment: 0,
                    currentValue: 0,
                    totalProfitLoss: 0,
                    totalReturnPercentage: 0
                },
                holdings: []
            };
        }

        let totalInvestment = 0;
        let totalCurrentValue = 0;

        const holdings = await Promise.all(
            portfolio.holdings.map(async (holding) => {

                const quote = await getQuote(holding.symbol);

                const investment =
                    holding.quantity * holding.averagePrice;

                const currentValue =
                    holding.quantity * quote.currentPrice;

                const profitLoss =
                    currentValue - investment;

                const returnPercentage =
                    investment === 0
                        ? 0
                        : (profitLoss / investment) * 100;

                totalInvestment += investment;
                totalCurrentValue += currentValue;

                return {
                    ...holding,
                    currentPrice: quote.currentPrice,
                    investment,
                    currentValue,
                    profitLoss,
                    returnPercentage
                };
            })
        );

        const totalProfitLoss =
            totalCurrentValue - totalInvestment;

        return {
            summary: {
                totalInvestment,
                currentValue: totalCurrentValue,
                totalProfitLoss,
                totalReturnPercentage:
                    totalInvestment === 0
                        ? 0
                        : (totalProfitLoss / totalInvestment) * 100
            },
            holdings
        };
    }

    async removeHolding(userId, holdingId) {
        const portfolio = await this.getPortfolio(userId);

        const holdingExists = portfolio.holdings.some(
            (holding) => holding._id.toString() === holdingId
        );

        if (!holdingExists) {
            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Holding not found",
                "HOLDING_NOT_FOUND"
            );
        }

        return portfolioRepository.deleteHolding(portfolio, holdingId);
    }
}

module.exports = new PortfolioService();