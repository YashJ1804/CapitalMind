const ApiError = require("../utils/apiError");

const validateCompany = (req, res, next) => {

    const { company } = req.body;

    if (!company || company.trim() === "") {

        return next(
            new ApiError(
                400,
                "Company name is required.",
                "INVALID_COMPANY"
            )
        );

    }

    if (company.length > 100) {

        return next(
            new ApiError(
                400,
                "Company name is too long.",
                "INVALID_COMPANY"
            )
        );

    }

    next();

};

module.exports = validateCompany;