const express = require("express");

const {
    getExchangeRate
} = require("../controllers/currencyController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get(
    "/usd-inr",
    authMiddleware,
    getExchangeRate
);

module.exports = router;