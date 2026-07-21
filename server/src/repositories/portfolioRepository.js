const Portfolio = require("../models/Portfolio");

class PortfolioRepository {
    async findByUser(userId) {
        return Portfolio.findOne({ user: userId });
    }

    async create(userId) {
        return Portfolio.create({
            user: userId,
            holdings: [],
        });
    }

    async save(portfolio) {
        return portfolio.save();
    }
    async updateHolding(portfolio) {
    return portfolio.save();
}

    async deleteHolding(portfolio, holdingId) {
        portfolio.holdings = portfolio.holdings.filter(
            (holding) => holding._id.toString() !== holdingId
        );

        return portfolio.save();
    }
}

module.exports = new PortfolioRepository();