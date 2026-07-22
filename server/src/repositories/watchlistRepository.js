const Watchlist = require("../models/Watchlist");

class WatchlistRepository {

    async findByUser(userId) {
        return Watchlist.findOne({ user: userId });
    }

    async findByUserLean(userId) {
        return Watchlist.findOne({ user: userId }).lean();
    }

    async create(userId) {
        return Watchlist.create({
            user: userId,
            stocks: []
        });
    }

    async save(watchlist) {
        return watchlist.save();
    }

    async deleteStock(watchlist, stockId) {
        watchlist.stocks.pull(stockId);
        return watchlist.save();
    }

}

module.exports = new WatchlistRepository();