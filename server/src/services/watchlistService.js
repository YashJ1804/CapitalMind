const watchlistRepository = require("../repositories/watchlistRepository");
const notificationService = require("./notificationService");

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

        const normalizedSymbol = stockData.symbol
            .trim()
            .toUpperCase();

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

        const savedWatchlist =
            await watchlistRepository.save(watchlist);

        // Create notification only after the stock
        // has been successfully added.
        await notificationService.createNotification({
            userId,
            type: "WATCHLIST_ADDED",
            title: "Stock Added",
            message: `${stockData.companyName || normalizedSymbol} has been added to your watchlist.`,
            symbol: normalizedSymbol
        });

        return savedWatchlist;
    }

    async removeStock(userId, stockId) {

        const watchlist = await this.getWatchlist(userId);

        const stock = watchlist.stocks.find(
            (stock) => stock._id.toString() === stockId
        );

        if (!stock) {
            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Stock not found",
                "STOCK_NOT_FOUND"
            );
        }

        const companyName = stock.companyName;
        const symbol = stock.symbol;

        const updatedWatchlist =
            await watchlistRepository.deleteStock(
                watchlist,
                stockId
            );

        // Create notification only after the stock
        // has been successfully removed.
        await notificationService.createNotification({
            userId,
            type: "WATCHLIST_REMOVED",
            title: "Stock Removed",
            message: `${companyName || symbol} has been removed from your watchlist.`,
            symbol
        });

        return updatedWatchlist;
    }

    async getWatchlistSummary(userId) {

        const watchlist =
            await watchlistRepository.findByUserLean(userId);

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