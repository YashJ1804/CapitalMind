const express = require("express");
const portfolioController = require("../controllers/portfolioController");
const portfolioAIController = require("../controllers/portfolioAIController");
const authMiddleware = require("../middlewares/authMiddleware");
const { aiLimiter } = require("../middlewares/rateLimiter");
const {
    addHoldingValidator
} = require("../validators/portfolioValidator");

const validationHandler = require("../validators/validationHandler");
const router = express.Router();

router.use(authMiddleware);

router.get("/", portfolioController.getPortfolio);

router.post("/", portfolioController.addHolding);

router.get(
    "/summary",
    portfolioController.getPortfolioSummary
);

router.get(
    "/ai-analysis",
    aiLimiter,
    portfolioAIController.analyzePortfolio
);

router.put(
    "/:holdingId",
    portfolioController.updateHolding
);

router.delete(
    "/:holdingId",
    portfolioController.removeHolding
);
router.post(
    "/",
    authMiddleware,
    addHoldingValidator,
    validationHandler,
    portfolioController.addHolding
);

module.exports = router;