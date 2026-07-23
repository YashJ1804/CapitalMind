const ApiError = require("../utils/apiError");
const HTTP_STATUS = require("../constants/httpStatus");

const errorHandler = (err, req, res, next) => {

    if (process.env.NODE_ENV !== "production") {
        console.error({
            method: req.method,
            url: req.originalUrl,
            message: err.message,
            code: err.code,
            stack: err.stack
        });
    }

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            timestamp: new Date().toISOString(),
            error: {
                code: err.code
            }
        });
    }

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message:
            process.env.NODE_ENV === "production"
                ? "Something went wrong."
                : err.message,
        timestamp: new Date().toISOString(),
        error: {
            code: "INTERNAL_SERVER_ERROR",
            ...(process.env.NODE_ENV !== "production" && {
                stack: err.stack
            })
        }
    });
};

module.exports = errorHandler;