const watchlistService = require("../services/watchlistService");
const ApiResponse = require("../utils/apiResponse");

class WatchlistController {

    async getWatchlist(req, res, next) {
        try {
            const watchlist = await watchlistService.getWatchlist(req.user.id);

            return ApiResponse.success(
                res,
                watchlist,
                "Watchlist fetched successfully"
            );
        } catch (error) {
            next(error);
        }
    }

    async addStock(req, res, next) {
        try {
            const watchlist = await watchlistService.addStock(
                req.user.id,
                req.body
            );

            return ApiResponse.success(
                res,
                watchlist,
                "Stock added to watchlist successfully"
            );
        } catch (error) {
            next(error);
        }
    }

    async removeStock(req, res, next) {
        try {
            const watchlist = await watchlistService.removeStock(
                req.user.id,
                req.params.stockId
            );

            return ApiResponse.success(
                res,
                watchlist,
                "Stock removed from watchlist successfully"
            );
        } catch (error) {
            next(error);
        }
    }
    async getWatchlistSummary(req, res, next) {
    try {
        const summary = await watchlistService.getWatchlistSummary(
            req.user.id
        );

        return ApiResponse.success(
            res,
            summary,
            "Watchlist summary fetched successfully"
        );
    } catch (error) {
        next(error);
    }
}

}

module.exports = new WatchlistController();