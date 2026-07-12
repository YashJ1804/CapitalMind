const express = require("express");
const cors = require("cors");

const logger = require("./config/logger");
const errorHandler = require("./middlewares/errorHandler");
const analysisRoutes = require("./routes/analysisRoutes");
const authRoutes = require("./routes/authRoutes");
const historyRoutes = require("./routes/historyRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const marketRoutes=require("./routes/marketRoutes");


const app = express();
app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "🚀 CapitalMind Backend is Live!",

        version: "1.0.0"

    });

});

app.use(cors());
app.use(express.json());
app.use("/api/history", historyRoutes);
app.use("/api/market", marketRoutes);
app.use(

    "/api/dashboard",

    dashboardRoutes

);

app.use(logger);

// Routes
app.use("/api/analyze", analysisRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);
// Error Handler (Always Last)
app.use(errorHandler);

module.exports = app;