const express = require("express");
const portfolioController = require("../controllers/portfolioController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", portfolioController.getPortfolio);

router.post("/", portfolioController.addHolding);

router.get(
    "/summary",
    authMiddleware,
    portfolioController.getPortfolioSummary
);

router.put("/:holdingId", portfolioController.updateHolding);

router.delete("/:holdingId", portfolioController.removeHolding);

module.exports = router;