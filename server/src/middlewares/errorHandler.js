const ApiError = require("../utils/apiError");

const errorHandler = (err, req, res, next) => {

    if (process.env.NODE_ENV !== "production") {
    console.error("❌ Error:", err);
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

    return res.status(500).json({
    success: false,
    message:
        process.env.NODE_ENV === "production"
            ? "Something went wrong."
            : err.message,
    timestamp: new Date().toISOString(),
    error: {
        code: "INTERNAL_SERVER_ERROR"
    }
});

};

module.exports = errorHandler;