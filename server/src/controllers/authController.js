const authService = require("../services/authService");
const ApiResponse = require("../utils/apiResponse");

class AuthController {
    async register(req, res, next) {
        try {
            await authService.register(req.body);

            return ApiResponse.success(
                res,
                null,
                "User registered successfully",
                201
            );
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const data = await authService.login(req.body);

            return ApiResponse.success(
                res,
                data,
                "Login successful"
            );
        } catch (error) {
            next(error);
        }
    }

    async changePassword(req, res, next) {
        try {
            const { currentPassword, newPassword } = req.body;

            await authService.changePassword(
                req.user.id,
                currentPassword,
                newPassword
            );

            return ApiResponse.success(
                res,
                null,
                "Password changed successfully"
            );
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();