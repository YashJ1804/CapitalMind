const express = require("express");

const router = express.Router();

const indianMarketController =
    require("../controllers/indianMarketController");

const authMiddleware =
    require("../middlewares/authMiddleware");

router.get(
    "/india/history",
    authMiddleware,
    indianMarketController.getIndianIndexHistory
);

router.get(
    "/india/status",
    authMiddleware,
    indianMarketController.getIndianMarketStatus
);

router.get(
    "/india",
    authMiddleware,
    indianMarketController.getIndianMarket
);

module.exports = router;