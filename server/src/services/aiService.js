const { searchCompany } = require("../tools/searchTool");
const { getCompanyProfile } = require("../tools/companyTool");
const { getQuote } = require("../tools/financialTool");
const { getCompanyNews } = require("../tools/newsTool");

const {
    makeInvestmentDecision
} = require("../agents/decisionAgent");

const analyzeStock = async (
    company,
    risk = "Moderate"
) => {

    const stock = await searchCompany(company);

    const [
        profile,
        quote,
        news
    ] = await Promise.all([

        getCompanyProfile(stock.symbol),

        getQuote(stock.symbol),

        getCompanyNews(stock.symbol)

    ]);

    const analysis =
        await makeInvestmentDecision(
            profile,
            quote,
            news,
            risk
        );

    return {

        symbol: stock.symbol,

        profile,

        quote,

        news,

        analysis

    };

};

module.exports = {

    analyzeStock

};