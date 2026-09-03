const mongoose = require("mongoose");

const analysisHistorySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        company: {
            type: String,
            required: true
        },

        // ==============================
        // AI ANALYSIS
        // ==============================

        recommendation: {
            type: String,
            required: true
        },

        score: {
            type: Number,
            required: true
        },

        confidence: {
            type: Number,
            required: true
        },

        summary: {
            type: String,
            required: true
        },

        reasoning: {
            type: mongoose.Schema.Types.Mixed,
            default: null
        },

        pros: {
            type: mongoose.Schema.Types.Mixed,
            default: null
        },

        cons: {
            type: mongoose.Schema.Types.Mixed,
            default: null
        },

        risks: {
            type: mongoose.Schema.Types.Mixed,
            default: null
        },

        outlook: {
            type: mongoose.Schema.Types.Mixed,
            default: null
        },

        // ==============================
        // MARKET DATA SNAPSHOT
        // ==============================

        profile: {
            type: mongoose.Schema.Types.Mixed,
            default: null
        },

        quote: {
            type: mongoose.Schema.Types.Mixed,
            default: null
        },

        chart: {
            type: mongoose.Schema.Types.Mixed,
            default: null
        },

        news: {
            type: mongoose.Schema.Types.Mixed,
            default: []
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "AnalysisHistory",
    analysisHistorySchema
);