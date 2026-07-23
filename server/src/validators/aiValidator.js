const { body } = require("express-validator");

const VALID_RISK_LEVELS = [
    "Low",
    "Moderate",
    "High"
];

const analyzeStockValidator = [
    body("company")
        .trim()
        .notEmpty()
        .withMessage("Company name is required.")
        .isLength({ min: 2, max: 100 })
        .withMessage("Company name must be between 2 and 100 characters."),

    body("risk")
        .optional()
        .isIn(VALID_RISK_LEVELS)
        .withMessage(
            `Risk must be one of: ${VALID_RISK_LEVELS.join(", ")}`
        )
];

module.exports = {
    analyzeStockValidator
};