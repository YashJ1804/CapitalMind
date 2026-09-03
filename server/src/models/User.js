const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },

        settings: {
            defaultMarket: {
                type: String,
                enum: ["INDIA", "USA"],
                default: "INDIA",
            },

            notifications: {
                type: Boolean,
                default: true,
            },

            emailNotifications: {
                type: Boolean,
                default: false,
            },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);