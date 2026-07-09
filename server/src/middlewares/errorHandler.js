const ApiError = require("../utils/apiError");

const errorHandler = (err, req, res, next) => {

    console.error("❌ Error:", err);

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

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        timestamp: new Date().toISOString(),
        error: {
            code: "INTERNAL_SERVER_ERROR"
        }
    });

};

module.exports = errorHandler;