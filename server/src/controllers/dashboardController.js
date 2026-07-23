const AnalysisHistory = require("../models/AnalysisHistory");
const Watchlist = require("../models/Watchlist");
const dashboardService = require("../services/dashboardService");
const ApiResponse = require("../utils/apiResponse");

const getDashboardStats = async (req, res, next) => {

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
        
        

    } catch (error) {

        next(error);

    }

};

const getSectorAllocation = async (req, res, next) => {

    try {

        const result = await dashboardService.getSectorAllocation(
            req.user.id
        );

        return ApiResponse.success(
            res,
            result,
            "Sector allocation fetched successfully."
        );

    } catch (error) {

        next(error);

    }

};

const getTopPerformers = async (req, res, next) => {

    try {

        const result = await dashboardService.getTopPerformers(
            req.user.id
        );

        return ApiResponse.success(
            res,
            result,
            "Top performers fetched successfully."
        );

    } catch (error) {

        next(error);

    }

};

module.exports = {

    getDashboardStats,
    getSectorAllocation,
    getTopPerformers

};