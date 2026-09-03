const express = require("express");

const router = express.Router();

const usMarketController =
    require("../controllers/usMarketController");

const authMiddleware =
    require("../middlewares/authMiddleware");

    
    router.get(
        "/usa/history",
        authMiddleware,
        usMarketController.getUSIndexHistory
    );
    
    
    router.get(
        "/usa/status",
        authMiddleware,
        usMarketController.getUSMarketStatus
    );
router.get(
    "/usa",
    authMiddleware,
    usMarketController.getUSMarket
);



module.exports = router;