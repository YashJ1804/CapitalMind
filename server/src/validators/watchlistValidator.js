const { body } = require("express-validator");

const addToWatchlistValidator = [
    body("symbol")
        .trim()
        .notEmpty()
        .withMessage("Stock symbol is required.")
        .isLength({ min: 1, max: 10 })
        .withMessage("Stock symbol must be between 1 and 10 characters.")
        .isAlphanumeric()
        .withMessage("Stock symbol must contain only letters and numbers.")
];

module.exports = {
    addToWatchlistValidator
};