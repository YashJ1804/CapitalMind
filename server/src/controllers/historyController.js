const AnalysisHistory = require("../models/AnalysisHistory");

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

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    getHistory

};