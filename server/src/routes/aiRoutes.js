const express = require("express");

const router = express.Router();

const aiController = require("../controllers/aiController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post(

    "/analyze",

    authMiddleware,

    aiController.analyzeStock

);

module.exports = router;