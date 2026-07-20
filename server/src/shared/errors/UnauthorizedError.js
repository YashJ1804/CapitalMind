const ApiError = require("../../utils/ApiError");
class UnauthorizedError extends ApiError {
    constructor(message = "Unauthorized") {
        super(401, message);
    }
}

module.exports = UnauthorizedError;