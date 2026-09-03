const {
    searchIndianCompany
} = require("../tools/indianCompanySearchTool");

const {
    getIndianCompanyQuote
} = require("../tools/indianCompanyQuoteTool");

const {
    getIndianCompanyHistory
} = require("../tools/indianCompanyHistoryTool");

const {
    getIndianMarketOverview
} = require("./indianMarketService");


// ============================================================
// Search Indian Company
// ============================================================

const searchCompany = async (query) => {

    return await searchIndianCompany(query);

};


// ============================================================
// Get Indian Company Quote
// ============================================================

const getCompanyQuote = async (symbol) => {

    return await getIndianCompanyQuote(symbol);

};

// ============================================================
// Complete Indian Company Analysis Data
// ============================================================

const getIndianCompanyAnalysisData = async (
    symbol,
    range = "1mo",
    interval = "1d"
) => {

    const [
        company,
        market
    ] = await Promise.all([

        getIndianCompanyData(
            symbol,
            range,
            interval
        ),

        getIndianMarketOverview()

    ]);


    return {

        company: {

            symbol: company.symbol,

            quote: company.quote,

            history: company.history

        },

        market

    };

};

// ============================================================
// Get Indian Company History
// ============================================================

const getCompanyHistory = async (
    symbol,
    range = "1mo",
    interval = "1d"
) => {

    return await getIndianCompanyHistory(
        symbol,
        range,
        interval
    );

};


// ============================================================
// Get Complete Indian Company Data
// ============================================================

const getIndianCompanyData = async (
    symbol,
    range = "1mo",
    interval = "1d"
) => {

    const [quote, history] =
        await Promise.all([

            getCompanyQuote(symbol),

            getCompanyHistory(
                symbol,
                range,
                interval
            )

        ]);


    return {

        symbol,

        quote,

        history

    };

};


module.exports = {

    searchCompany,

    getCompanyQuote,

    getCompanyHistory,

    getIndianCompanyData,

    getIndianCompanyAnalysisData

};