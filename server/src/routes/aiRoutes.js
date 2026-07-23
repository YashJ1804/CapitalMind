const express = require("express");
const router = express.Router();

const aiController = require("../controllers/aiController");
const authMiddleware = require("../middlewares/authMiddleware");
const { aiLimiter } = require("../middlewares/rateLimiter");

const {
    analyzeStockValidator
} = require("../validators/aiValidator");

const validationHandler = require("../validators/validationHandler");

router.post(
    "/analyze",
    authMiddleware,
    aiLimiter,
    aiController.analyzeStock
);

router.post(
    "/analyze",
    authMiddleware,
    aiLimiter,
    analyzeStockValidator,
    validationHandler,
    aiController.analyzeStock
);
module.exports = router;