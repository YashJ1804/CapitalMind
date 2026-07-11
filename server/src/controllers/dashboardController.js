const AnalysisHistory = require("../models/AnalysisHistory");
const Watchlist = require("../models/Watchlist");

const getDashboardStats = async (req, res) => {

    try {

        const userId = req.user.id;

        const analyses = await AnalysisHistory.find({

            user: userId

        });

        const watchlist = await Watchlist.find({

            user: userId

        });

        const totalAnalyses = analyses.length;

        const totalWatchlist = watchlist.length;

        const buyCount = analyses.filter(

            item => item.recommendation === "BUY"

        ).length;

        const holdCount = analyses.filter(

            item => item.recommendation === "HOLD"

        ).length;

        const passCount = analyses.filter(

            item => item.recommendation === "PASS"

        ).length;

        const averageScore = totalAnalyses === 0

            ? 0

            : Math.round(

                analyses.reduce(

                    (sum, item) => sum + item.score,

                    0

                ) / totalAnalyses

            );

        const lastAnalysis = analyses.length

            ? analyses[analyses.length - 1]

            : null;

        return res.json({

            success: true,

            stats: {

                totalAnalyses,

                totalWatchlist,

                buyCount,

                holdCount,

                passCount,

                averageScore,

                lastAnalysis

            }

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

    getDashboardStats

};