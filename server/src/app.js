const express = require("express");
const cors = require("cors");

const logger = require("./config/logger");
const errorHandler = require("./middlewares/errorHandler");

const analysisRoutes = require("./routes/analysisRoutes");
const authRoutes = require("./routes/authRoutes");
const historyRoutes = require("./routes/historyRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const marketRoutes = require("./routes/marketRoutes");

const app = express();

// CORS Configuration
const allowedOrigins = [
    "http://localhost:5173",
    "https://capital-mind-eta.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {

        // Allow requests with no origin (Postman, curl, server-to-server)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));

    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

app.use(express.json());

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "🚀 CapitalMind Backend is Live!",
        version: "1.0.0"
    });

});

app.use(logger);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/analyze", analysisRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/market", marketRoutes);

// Error Handler
app.use(errorHandler);

module.exports = app;