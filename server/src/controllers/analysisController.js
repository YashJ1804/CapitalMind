const investmentGraph = require("../graph/investmentGraph");
const AnalysisHistory = require("../models/AnalysisHistory");
const AnalysisCache = require("../models/AnalysisCache");

const analyzeCompany = async (req, res) => {

    try {

        const { company } = req.body;

        if (!company || company.trim() === "") {

            return res.status(400).json({

                success: false,

                message: "Please enter a company name."

            });

        }

        const companyName = company.trim().toUpperCase();

        const cache = await AnalysisCache.findOne({

            company: companyName

        });

        const CACHE_DURATION = 24 * 60 * 60 * 1000;

        let result;

        if (cache) {

            const age = Date.now() - new Date(cache.updatedAt).getTime();

            if (age < CACHE_DURATION) {

                console.log("⚡ Returning Cached Analysis");

                result = {

                    analysis: cache.analysis,
                    profile: cache.profile,
                    quote: cache.quote,
                    news: cache.news,
                    chart: cache.chart

                };

            }

        }

        if (!result) {

            console.log("🤖 Running LangGraph");

            result = await investmentGraph.invoke({

                company

            });

            if (!result.profile) {

                return res.status(404).json({

                    success: false,

                    message: "Company profile not found."

                });

            }

            if (!result.quote) {

                return res.status(404).json({

                    success: false,

                    message: "Market data unavailable."

                });

            }

            if (!result.analysis) {

                return res.status(500).json({

                    success: false,

                    message: "AI failed to generate investment analysis."

                });

            }

           await AnalysisCache.findOneAndUpdate(
    { company: companyName },
    {
        company: companyName,
        analysis: result.analysis,
        profile: result.profile,
        quote: result.quote,
        news: result.news,
        chart: result.chart,
        updatedAt: new Date()
    },
    {
        upsert: true,
        new: true
    }
);

        }

        await AnalysisHistory.create({

            user: req.user.id,

            company: result.analysis.company,

            recommendation: result.analysis.recommendation,

            score: result.analysis.score,

            confidence: result.analysis.confidence,

            summary: result.analysis.summary

        });

        return res.status(200).json({

            success: true,

            data: {

                analysis: result.analysis,
                profile: result.profile,
                quote: result.quote,
                news: result.news,
                chart: result.chart

            }

        });

    }

    catch (error) {

        console.error("❌ Analysis Controller Error");
        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message || "Something went wrong while analyzing the company."

        });

    }

};

module.exports = {

    analyzeCompany

};