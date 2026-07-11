const express = require("express");
const router = express.Router();

const { analyzeCompany } = require("../controllers/analysisController");

const validateCompany = require("../middlewares/validateCompany");

const authMiddleware = require("../middlewares/authMiddleware");

router.post(
    "/",
    authMiddleware,
    validateCompany,
    analyzeCompany
);

module.exports = router;