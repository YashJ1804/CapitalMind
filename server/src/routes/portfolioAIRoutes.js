const express = require("express");

const router = express.Router();

const portfolioAIController = require("../controllers/portfolioAIController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get(
    "/ai-analysis",
    authMiddleware,
    portfolioAIController.analyzePortfolio
);

module.exports = router;