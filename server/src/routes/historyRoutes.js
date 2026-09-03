const express = require("express");

const router = express.Router();

const historyController = require("../controllers/historyController");

const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);


// Get all history
router.get(
    "/",
    historyController.getHistory
);


// Get one historical analysis
router.get(
    "/:id",
    historyController.getHistoryById
);

module.exports = router;