class ApiResponse {
    static success(res, data = null, message = "Success", status = 200) {
        return res.status(status).json({
            success: true,
            message,
            data,
            timestamp: new Date().toISOString(),
        });
    }

    static error(
        res,
        message = "Something went wrong",
        status = 500,
        errors = null
    ) {
        return res.status(status).json({
            success: false,
            message,
            errors,
            timestamp: new Date().toISOString(),
        });
    }
}

module.exports = ApiResponse;