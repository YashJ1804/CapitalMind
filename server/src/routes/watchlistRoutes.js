const express = require("express");

const router = express.Router();

const watchlistController = require("../controllers/watchlistController");
const authMiddleware = require("../middlewares/authMiddleware");
const {
    addToWatchlistValidator
} = require("../validators/watchlistValidator");

const validationHandler = require("../validators/validationHandler");

router.get(
    "/",
    authMiddleware,
    watchlistController.getWatchlist
);

router.post(
    "/",
    authMiddleware,
    watchlistController.addStock
);
router.get(
    "/summary",
    authMiddleware,
    watchlistController.getWatchlistSummary
);

router.delete(
    "/:stockId",
    authMiddleware,
    watchlistController.removeStock
);
router.post(
    "/",
    authMiddleware,
    addToWatchlistValidator,
    validationHandler,
    watchlistController.addToWatchlist
);

module.exports = router;