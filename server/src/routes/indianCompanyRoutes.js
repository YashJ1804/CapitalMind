const express = require("express");

const router = express.Router();

const indianCompanyController =
    require("../controllers/indianCompanyController");

const authMiddleware =
    require("../middlewares/authMiddleware");


// ============================================================
// Indian Company Search
// ============================================================

router.get(
    "/search",
    authMiddleware,
    indianCompanyController.searchCompany
);


// ============================================================
// Indian Company Quote
// ============================================================

router.get(
    "/quote",
    authMiddleware,
    indianCompanyController.getCompanyQuote
);


// ============================================================
// Indian Company History
// ============================================================

router.get(
    "/history",
    authMiddleware,
    indianCompanyController.getCompanyHistory
);

router.get(
    "/analysis",
    authMiddleware,
    indianCompanyController.getCompanyAnalysis
);


module.exports = router;