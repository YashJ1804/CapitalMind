const { body } = require("express-validator");

const addToWatchlistValidator = [

    body("symbol")
        .trim()
        .notEmpty()
        .withMessage("Stock symbol is required.")

        .isLength({ min: 1, max: 20 })
        .withMessage(
            "Stock symbol must be between 1 and 20 characters."
        )

        .matches(/^[A-Za-z0-9.-]+$/)
        .withMessage(
            "Stock symbol must contain only letters, numbers, dots, and hyphens."
        )

];

module.exports = {
    addToWatchlistValidator
};