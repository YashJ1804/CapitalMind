const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRepository = require("../repositories/authRepository");
const ApiError = require("../utils/apiError");
const HTTP_STATUS = require("../constants/httpStatus");

class AuthService {
    async register({ name, email, password }) {
        const existingUser = await authRepository.findByEmail(email);

        if (existingUser) {
            throw new ApiError(
                HTTP_STATUS.CONFLICT,
                "Email already registered",
                "EMAIL_ALREADY_EXISTS"
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await authRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return null;
    }

    async login({ email, password }) {
        const user = await authRepository.findByEmail(email);

        if (!user) {
            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Invalid email",
                "INVALID_EMAIL"
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Invalid password",
                "INVALID_PASSWORD"
            );
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        };
    }

    async changePassword(userId, currentPassword, newPassword) {
        const user = await authRepository.findById(userId);

        if (!user) {
            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "User not found",
                "USER_NOT_FOUND"
            );
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Current password is incorrect",
                "INVALID_CURRENT_PASSWORD"
            );
        }

        user.password = await bcrypt.hash(newPassword, 10);

        await authRepository.save(user);

        return null;
    }
}

module.exports = new AuthService();