const { body } = require("express-validator");

const addHoldingValidator = [
    body("symbol")
        .trim()
        .notEmpty()
        .withMessage("Stock symbol is required.")
        .isLength({ min: 1, max: 10 })
        .withMessage("Stock symbol must be between 1 and 10 characters.")
        .isAlphanumeric()
        .withMessage("Stock symbol must contain only letters and numbers."),

    body("quantity")
        .isFloat({ gt: 0 })
        .withMessage("Quantity must be greater than 0."),

    body("averagePrice")
        .isFloat({ gt: 0 })
        .withMessage("Average price must be greater than 0.")
];

module.exports = {
    addHoldingValidator
};