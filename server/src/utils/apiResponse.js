const successResponse = (message, data = null) => {
    return {
        success: true,
        message,
        timestamp: new Date().toISOString(),
        data
    };
};

module.exports = {
    successResponse
};