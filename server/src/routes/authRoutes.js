const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const authMiddleware = require("../middlewares/authMiddleware");

const {
    registerValidator,
    loginValidator,
    changePasswordValidator,
    settingsValidator
} = require("../validators/authValidator");

const validationHandler = require("../validators/validationHandler");

router.post(
    "/register",
    registerValidator,
    validationHandler,
    authController.register
);

router.post(
    "/login",
    loginValidator,
    validationHandler,
    authController.login
);

router.post(
    "/change-password",
    authMiddleware,
    changePasswordValidator,
    validationHandler,
    authController.changePassword
);

router.put(
    "/settings",
    authMiddleware,
    settingsValidator,
    validationHandler,
    authController.updateSettings
);

module.exports = router;