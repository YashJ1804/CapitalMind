const investmentGraph =
    require("../graph/investmentGraph");

const AnalysisHistory =
    require("../models/AnalysisHistory");

const AnalysisCache =
    require("../models/AnalysisCache");

const {
    searchIndianCompany
} = require("../tools/indianCompanySearchTool");

const {
    getIndianCompanyAnalysisData
} = require("../services/indianCompanyService");

const {
    analyzeIndianCompany
} = require("../agents/indianDecisionAgent");


// ============================================================
// Analyze Company
// ============================================================

const analyzeCompany = async (req, res) => {

    try {

        const {
            company,
            market
        } = req.body;
        


        // ====================================================
        // Validate company
        // ====================================================

        if (!company || company.trim() === "") {

            return res.status(400).json({

                success: false,

                message:
                    "Please enter a company name."

            });

        }


        const companyName =
            company.trim().toUpperCase();


        // ====================================================
        // 🇮🇳 INDIAN MARKET PIPELINE
        // ====================================================

        if (market === "INDIA") {

            console.log(
                `🇮🇳 Using Yahoo Indian Pipeline for ${companyName}`
            );


            try {

                // --------------------------------------------
                // Resolve company name to Yahoo symbol
                // --------------------------------------------

                const searchResults =
                    await searchIndianCompany(
                        companyName
                    );


                const indianCompany =
                    searchResults.find(
                        (item) => {

                            const symbol =
                                item.symbol?.toUpperCase();

                            return (
                                symbol?.endsWith(".NS") ||
                                symbol?.endsWith(".BO")
                            );

                        }
                    );


                if (!indianCompany) {

                    return res.status(404).json({

                        success: false,

                        message:
                            `Indian company "${companyName}" was not found.`

                    });

                }


                const indianSymbol =
                    indianCompany.symbol;


                console.log(
                    `🇮🇳 Resolved ${companyName} → ${indianSymbol}`
                );


                // --------------------------------------------
                // Yahoo + Indian Market Data
                // --------------------------------------------

                const marketData =
                    await getIndianCompanyAnalysisData(
                        indianSymbol
                    );


                // --------------------------------------------
                // Gemini Indian Analysis
                // --------------------------------------------

                const analysis =
                    await analyzeIndianCompany(
                        marketData
                    );


                // --------------------------------------------
                // Quote
                // --------------------------------------------

                const indianQuote =
                    marketData.company?.quote || {};


                // --------------------------------------------
                // Exchange
                // --------------------------------------------

                const isBSE =
                    indianSymbol
                        .toUpperCase()
                        .endsWith(".BO");


                // --------------------------------------------
                // Response
                // --------------------------------------------

                return res.status(200).json({

                    success: true,

                    data: {

                        analysis,

                        profile: {

                            ticker:
                                indianSymbol,

                            name:
                                indianCompany.name ||
                                indianSymbol,

                            industry:
                                "Indian Equity",

                            exchange:
                                isBSE
                                    ? "BSE"
                                    : "NSE",

                            country:
                                "India",

                            marketCap:
                                indianQuote.marketCap ??
                                0

                        },


                        quote: {

                            currentPrice:
                                indianQuote.price ??
                                0,

                            high:
                                indianQuote.dayHigh ??
                                0,

                            low:
                                indianQuote.dayLow ??
                                0,

                            change:
                                indianQuote.change ??
                                0,

                            percentChange:
                                indianQuote.changePercent ??
                                0

                        },


                        news: [],


                        chart:
                            marketData.company?.history ||
                            null,


                        market:
                            marketData.market ||
                            null

                    }

                });


            } catch (error) {

                console.error(
                    "❌ Indian Analysis Error:"
                );

                console.error(error);


                return res.status(500).json({

                    success: false,

                    message:
                        error.message ||
                        "Unable to analyze Indian company."

                });

            }

        }


        // ====================================================
        // 🇺🇸 EXISTING USA / GENERAL PIPELINE
        // ====================================================

        const cache =
            await AnalysisCache.findOne({

                company:
                    companyName

            });


        const CACHE_DURATION =
            24 * 60 * 60 * 1000;


        let result;


        // ====================================================
        // Cache
        // ====================================================

        if (cache) {

            const age =
                Date.now() -
                new Date(
                    cache.updatedAt
                ).getTime();


            if (age < CACHE_DURATION) {

                console.log(
                    "⚡ Returning Cached Analysis"
                );


                result = {

                    analysis:
                        cache.analysis,

                    profile:
                        cache.profile,

                    quote:
                        cache.quote,

                    news:
                        cache.news,

                    chart:
                        cache.chart

                };

            }

        }


        // ====================================================
        // LangGraph
        // ====================================================

        if (!result) {

            console.log(
                "🤖 Running LangGraph"
            );


            result =
                await investmentGraph.invoke({

                    company

                });


            // --------------------------------------------
            // Validate profile
            // --------------------------------------------

            if (!result.profile) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Company profile not found."

                });

            }


            // --------------------------------------------
            // Validate quote
            // --------------------------------------------

            if (!result.quote) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Market data unavailable."

                });

            }


            // --------------------------------------------
            // Validate AI analysis
            // --------------------------------------------

            if (!result.analysis) {

                return res.status(500).json({

                    success: false,

                    message:
                        "AI failed to generate investment analysis."

                });

            }


            // --------------------------------------------
            // Save cache
            // --------------------------------------------

            await AnalysisCache.findOneAndUpdate(

                {
                    company:
                        companyName
                },

                {

                    company:
                        companyName,

                    analysis:
                        result.analysis,

                    profile:
                        result.profile,

                    quote:
                        result.quote,

                    news:
                        result.news,

                    chart:
                        result.chart,

                    updatedAt:
                        new Date()

                },

                {

                    upsert:
                        true,

                    new:
                        true

                }

            );

        }


        // ====================================================
        // Save Analysis History
        // ====================================================

        await AnalysisHistory.create({

            user:
                req.user.id,


            // Basic analysis

            company:
                result.analysis.company,

            recommendation:
                result.analysis.recommendation,

            score:
                result.analysis.score,

            confidence:
                result.analysis.confidence,

            summary:
                result.analysis.summary,


            // Complete AI analysis

            reasoning:
                result.analysis.reasoning,

            pros:
                result.analysis.pros,

            cons:
                result.analysis.cons,

            risks:
                result.analysis.risks,

            outlook:
                result.analysis.outlook,


            // Market snapshot

            profile:
                result.profile,

            quote:
                result.quote,

            chart:
                result.chart,

            news:
                result.news || []

        });


        // ====================================================
        // Existing Response
        // ====================================================

        return res.status(200).json({

            success: true,

            data: {

                analysis:
                    result.analysis,

                profile:
                    result.profile,

                quote:
                    result.quote,

                news:
                    result.news,

                chart:
                    result.chart

            }

        });


    } catch (error) {

        console.error(
            "❌ Analysis Controller Error"
        );

        console.error(error);


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Something went wrong while analyzing the company."

        });

    }

};


module.exports = {

    analyzeCompany

};