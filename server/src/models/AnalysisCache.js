const mongoose = require("mongoose");

const analysisCacheSchema = new mongoose.Schema(

    {

        company: {

            type: String,

            required: true,

            unique: true,

            uppercase: true,

            trim: true

        },

        analysis: {

            type: Object,

            required: true

        },

        profile: {

            type: Object,

            required: true

        },

        quote: {

            type: Object,

            required: true

        },

        news: {

            type: Array,

            required: true

        }

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model(
    "AnalysisCache",
    analysisCacheSchema
);