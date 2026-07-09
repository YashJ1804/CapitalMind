const express = require("express");
const router = express.Router();

const { analyzeCompany } = require("../controllers/analysisController");

const validateCompany = require("../middlewares/validateCompany");

router.post(
    "/",
    validateCompany,
    analyzeCompany
);

module.exports = router;