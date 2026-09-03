const axios = require("axios");

const yahooClient = axios.create({
    baseURL: "https://query1.finance.yahoo.com",
    timeout: 10000,
    headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
    }
});


// ============================================================
// Indian Exchange Detection
// ============================================================

const isIndianSymbol = (quote) => {

    const symbol =
        quote?.symbol?.toUpperCase() || "";

    const exchange =
        quote?.exchange?.toUpperCase() || "";

    return (
        symbol.endsWith(".NS") ||
        symbol.endsWith(".BO") ||
        exchange === "NSI" ||
        exchange === "BSE"
    );

};


// ============================================================
// Search Indian Company
// ============================================================

const searchIndianCompany = async (query) => {

    if (!query || !query.trim()) {

        throw new Error(
            "Company search query is required."
        );

    }


    try {

        const response =
            await yahooClient.get(
                "/v1/finance/search",
                {
                    params: {
                        q: query.trim(),
                        quotesCount: 20,
                        newsCount: 0,
                        listsCount: 0
                    }
                }
            );


        const quotes =
            response.data?.quotes || [];


        const indianQuotes =
            quotes.filter(
                isIndianSymbol
            );


        const results =
            indianQuotes.map(
                (quote) => ({

                    symbol:
                        quote.symbol ||
                        null,

                    name:
                        quote.longname ||
                        quote.shortname ||
                        quote.symbol ||
                        null,

                    exchange:
                        quote.exchange ||
                        null,

                    quoteType:
                        quote.quoteType ||
                        null,

                    typeDisp:
                        quote.typeDisp ||
                        null

                })
            );


        return results;


    } catch (error) {

        console.error(
            "Yahoo Indian company search error:",
            error.response?.data ||
            error.message
        );


        throw new Error(
            "Failed to search Indian companies."
        );

    }

};


module.exports = {
    searchIndianCompany
};


if (require.main === module) {

    searchIndianCompany("TCS")

        .then((data) => {

            console.log(
                "🇮🇳 Yahoo Indian Company Search:"
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