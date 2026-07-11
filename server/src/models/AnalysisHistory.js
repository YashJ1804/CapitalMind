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