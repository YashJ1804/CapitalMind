const express = require("express");

const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

const authMiddleware = require("../middlewares/authMiddleware");

const {

    getDashboardStats

} = require("../controllers/dashboardController");

router.get(

    "/stats",

    authMiddleware,

    getDashboardStats

);

router.get(
    "/allocation",
    authMiddleware,
    dashboardController.getSectorAllocation
);
router.get(
    "/top-performers",
    authMiddleware,
    dashboardController.getTopPerformers
);

module.exports = router;