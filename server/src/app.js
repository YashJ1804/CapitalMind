const express = require("express");
const cors = require("cors");

const logger = require("./config/logger");
const errorHandler = require("./middlewares/errorHandler");
const analysisRoutes = require("./routes/analysisRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(logger);

// Routes
app.use("/api/analyze", analysisRoutes);

// Error Handler (Always Last)
app.use(errorHandler);

module.exports = app;