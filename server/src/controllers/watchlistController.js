const Watchlist = require("../models/Watchlist");

const addToWatchlist = async (req, res) => {

    try {

        const { symbol, company } = req.body;

        const exists = await Watchlist.findOne({
            user: req.user.id,
            symbol,
        });

        if (exists) {

            return res.status(400).json({
                success: false,
                message: "Already in watchlist",
            });

        }

        const item = await Watchlist.create({
            user: req.user.id,
            symbol,
            company,
        });

        res.status(201).json({
            success: true,
            data: item,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

const getWatchlist = async (req, res) => {

    try {

        const items = await Watchlist.find({
            user: req.user.id,
        }).sort({
            createdAt: -1,
        });

        res.json({
            success: true,
            data: items,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

const removeFromWatchlist = async (req, res) => {

    try {

        await Watchlist.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Removed from watchlist",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    addToWatchlist,
    getWatchlist,
    removeFromWatchlist,
};