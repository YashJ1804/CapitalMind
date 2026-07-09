const { searchCompany } = require("../tools/searchTool");
const { getCompanyProfile } = require("../tools/companyTool");
const { getQuote } = require("../tools/financialTool");
const { getCompanyNews } = require("../tools/newsTool");
const { makeInvestmentDecision } = require("../agents/decisionAgent");

const runInvestmentWorkflow = async (company) => {

    try {

        // Search Company
        console.time("🔍 Search Company");

        const stock = await searchCompany(company);

        console.timeEnd("🔍 Search Company");

        console.log("✅ Symbol:", stock.symbol);


        // Profile & Quote in Parallel
        console.time("📊 Profile + Quote");

        const [profile, quote] = await Promise.all([
            getCompanyProfile(stock.symbol),
            getQuote(stock.symbol)
        ]);

        console.timeEnd("📊 Profile + Quote");


        // Company News
        console.time("📰 Company News");

        const news = await getCompanyNews(stock.symbol);

        console.timeEnd("📰 Company News");


        // AI Analysis
        console.time("🤖 Gemini Analysis");

        const decision = await makeInvestmentDecision(
            profile,
            quote,
            news
        );

        console.timeEnd("🤖 Gemini Analysis");

        return decision;

    } catch (error) {

        console.error("❌ Investment Workflow Error");

        console.error(error);

        throw error;

    }

};

module.exports = {
    runInvestmentWorkflow
};