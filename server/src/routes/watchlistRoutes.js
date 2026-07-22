const express = require("express");

const router = express.Router();

const watchlistController = require("../controllers/watchlistController");
const authMiddleware = require("../middlewares/authMiddleware");

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


module.exports = router;