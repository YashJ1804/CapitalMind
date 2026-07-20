const mongoose = require("mongoose");

const holdingSchema = new mongoose.Schema(
    {
        symbol: {
            type: String,
            required: true,
            uppercase: true,
            trim: true,
        },

        companyName: {
            type: String,
            required: true,
            trim: true,
        },

        exchange: {
            type: String,
            default: "NASDAQ",
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        averagePrice: {
            type: Number,
            required: true,
            min: 0,
        },

        purchaseDate: {
            type: Date,
            default: Date.now,
        },

        sector: {
            type: String,
            default: "",
        },

        industry: {
            type: String,
            default: "",
        },

        currency: {
            type: String,
            default: "USD",
        },
    },
    {
        _id: true,
    }
);

const portfolioSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        holdings: [holdingSchema],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);