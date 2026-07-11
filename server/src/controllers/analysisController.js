const investmentGraph = require("../graph/investmentGraph");
const AnalysisHistory = require("../models/AnalysisHistory");
const AnalysisCache = require("../models/AnalysisCache");
const analyzeCompany = async (req, res, next) => {

    try {

        const { company } = req.body;

        const cache = await AnalysisCache.findOne({
    company: company.toUpperCase()
});

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

let useCache = false;

if (cache) {

    const age = Date.now() - new Date(cache.updatedAt).getTime();

    if (age < CACHE_DURATION) {

        useCache = true;

    }

}

let result;

if (useCache) {

    console.log("⚡ Returning Cached Analysis");

    result = {

        analysis: cache.analysis,

        profile: cache.profile,

        quote: cache.quote,

        news: cache.news,

    };

} else {

    console.log("🤖 Running LangGraph");

    result = await investmentGraph.invoke({

        company

    });

    await AnalysisCache.create({

        company: company.toUpperCase(),

        analysis: result.analysis,

        profile: result.profile,

        quote: result.quote,

        news: result.news,

        chart: result.chart

    });

}

        await AnalysisHistory.create({

            user: req.user.id,

            company: result.analysis.company,

            recommendation: result.analysis.recommendation,

            score: result.analysis.score,

            confidence: result.analysis.confidence,

            summary: result.analysis.summary

        });

        return res.json({

            success: true,

            data: {

                analysis: result.analysis,

                profile: result.profile,

                quote: result.quote,

                news: result.news

            }

        });

    }

    catch (error) {

        next(error);

    }

};

module.exports = {

    analyzeCompany

};