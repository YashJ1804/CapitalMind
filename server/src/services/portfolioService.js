const portfolioRepository = require("../repositories/portfolioRepository");
const ApiError = require("../utils/apiError");
const HTTP_STATUS = require("../constants/httpStatus");

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
            (holding) => holding.symbol === holdingData.symbol.toUpperCase()
        );

        if (existingHolding) {
            throw new ApiError(
                HTTP_STATUS.CONFLICT,
                "Stock already exists in portfolio",
                "HOLDING_ALREADY_EXISTS"
            );
        }

        portfolio.holdings.push(holdingData);

        return portfolioRepository.save(portfolio);
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