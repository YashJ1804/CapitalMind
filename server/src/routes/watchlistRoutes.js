const express = require("express");

const router = express.Router();

const watchlistController = require("../controllers/watchlistController");
const authMiddleware = require("../middlewares/authMiddleware");

const {
    addToWatchlistValidator
} = require("../validators/watchlistValidator");

const validationHandler = require("../validators/validationHandler");

/*
|--------------------------------------------------------------------------
| Get Watchlist
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    authMiddleware,
    watchlistController.getWatchlist
);

/*
|--------------------------------------------------------------------------
| Add Stock to Watchlist
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    authMiddleware,
    addToWatchlistValidator,
    validationHandler,
    watchlistController.addStock
);

/*
|--------------------------------------------------------------------------
| Watchlist Summary
|--------------------------------------------------------------------------
*/

router.get(
    "/summary",
    authMiddleware,
    watchlistController.getWatchlistSummary
);

/*
|--------------------------------------------------------------------------
| Remove Stock
|--------------------------------------------------------------------------
*/

router.delete(
    "/:stockId",
    authMiddleware,
    watchlistController.removeStock
);

module.exports = router;