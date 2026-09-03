const AnalysisHistory = require("../models/AnalysisHistory");


// ==========================================
// GET ALL HISTORY
// ==========================================

const getHistory = async (req, res) => {

    try {

        const history = await AnalysisHistory.find({

            user: req.user.id

        }).sort({

            createdAt: -1

        });

        res.json({

            success: true,

            data: history

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ==========================================
// GET SINGLE HISTORY ITEM
// ==========================================

const getHistoryById = async (req, res) => {

    try {

        const history = await AnalysisHistory.findOne({

            _id: req.params.id,

            user: req.user.id

        });

        if (!history) {

            return res.status(404).json({

                success: false,

                message: "Analysis history not found."

            });

        }

        return res.status(200).json({

            success: true,

            data: history

        });

    } catch (error) {

        console.error(
            "Failed to fetch historical analysis:",
            error
        );

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


module.exports = {

    getHistory,

    getHistoryById

};