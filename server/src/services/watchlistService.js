const watchlistRepository = require("../repositories/watchlistRepository");
const ApiError = require("../utils/apiError");
const HTTP_STATUS = require("../constants/httpStatus");
const { getQuote } = require("../tools/financialTool");

class WatchlistService {

    async getWatchlist(userId) {
        let watchlist = await watchlistRepository.findByUser(userId);

        if (!watchlist) {
            watchlist = await watchlistRepository.create(userId);
        }

        return watchlist;
    }

    async addStock(userId, stockData) {

        const watchlist = await this.getWatchlist(userId);

        const normalizedSymbol = stockData.symbol.trim().toUpperCase();

        const existingStock = watchlist.stocks.find(
            (stock) => stock.symbol === normalizedSymbol
        );

        if (existingStock) {
            throw new ApiError(
                HTTP_STATUS.CONFLICT,
                "Stock already exists in watchlist",
                "STOCK_ALREADY_EXISTS"
            );
        }

        watchlist.stocks.push({
            ...stockData,
            symbol: normalizedSymbol
        });

        return watchlistRepository.save(watchlist);
    }

    async removeStock(userId, stockId) {

        const watchlist = await this.getWatchlist(userId);

        const stockExists = watchlist.stocks.some(
            (stock) => stock._id.toString() === stockId
        );

        if (!stockExists) {
            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Stock not found",
                "STOCK_NOT_FOUND"
            );
        }

        return watchlistRepository.deleteStock(
            watchlist,
            stockId
        );
    }
    async getWatchlistSummary(userId) {

    const watchlist = await watchlistRepository.findByUserLean(userId);

    if (!watchlist) {
        return {
            stocks: []
        };
    }

    const stocks = await Promise.all(

        watchlist.stocks.map(async (stock) => {

            const quote = await getQuote(stock.symbol);

            return {

                ...stock,

                currentPrice: quote.currentPrice,
                change: quote.change,
                percentChange: quote.percentChange

            };

        })

    );

    return { stocks };
}

}

module.exports = new WatchlistService();