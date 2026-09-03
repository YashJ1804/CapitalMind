const axios = require("axios");


// ============================================================
// Yahoo Finance Search Client
// ============================================================

const yahooSearchClient = axios.create({
    baseURL: "https://query1.finance.yahoo.com",
    timeout: 10000,
    headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
    }
});


// ============================================================
// Search Companies
// ============================================================

const searchCompanies = async (query) => {

    if (!query || !query.trim()) {

        throw new Error(
            "Search query is required."
        );

    }

    try {

        const response =
            await yahooSearchClient.get(
                "/v1/finance/search",
                {
                    params: {
                        q: query.trim(),
                        quotesCount: 10,
                        newsCount: 0,
                        listsCount: 0
                    }
                }
            );


        const quotes =
            response.data?.quotes || [];


        return quotes.map((quote) => ({

            symbol: quote.symbol,

            name:
                quote.longname ||
                quote.shortname ||
                quote.symbol,

            exchange:
                quote.exchange ||
                null,

            quoteType:
                quote.quoteType ||
                null,

            typeDisp:
                quote.typeDisp ||
                null,

            exchangeTimezoneName:
                quote.exchangeTimezoneName ||
                null

        }));


    } catch (error) {

        console.error(
            "Yahoo Search error:",
            error.response?.data ||
            error.message
        );

        throw new Error(
            "Failed to search Yahoo Finance."
        );

    }

};


// ============================================================
// Search Indian Companies
// ============================================================

const searchIndianCompanies = async (query) => {

    const results =
        await searchCompanies(query);


    const indianResults =
        results.filter((company) => {

            const symbol =
                company.symbol || "";

            const exchange =
                company.exchange || "";


            return (

                symbol.endsWith(".NS") ||

                symbol.endsWith(".BO") ||

                exchange === "NMS" ||

                exchange === "BSE"

            );

        });


    return indianResults;

};


module.exports = {

    searchCompanies,

    searchIndianCompanies

};


// ============================================================
// Direct Test
// ============================================================

if (require.main === module) {

    searchIndianCompanies("Reliance")

        .then((data) => {

            console.log(
                "🇮🇳 Yahoo Indian Search:"
            );

            console.dir(
                data,
                { depth: null }
            );

        })

        .catch((error) => {

            console.error(
                error.message
            );

        });

}