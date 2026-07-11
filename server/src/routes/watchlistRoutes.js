const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
    addToWatchlist,
    getWatchlist,
    removeFromWatchlist,
} = require("../controllers/watchlistController");

router.get("/", authMiddleware, getWatchlist);

router.post("/", authMiddleware, addToWatchlist);

router.delete("/:id", authMiddleware, removeFromWatchlist);

module.exports = router;