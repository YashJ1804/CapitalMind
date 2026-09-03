const axios = require("axios");

const yahooClient = axios.create({
    baseURL: "https://query1.finance.yahoo.com",
    timeout: 10000,
    headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
    }
});


const getIndianCompanyQuote = async (symbol) => {

    if (!symbol) {
        throw new Error("Company symbol is required.");
    }

    try {

        const response = await yahooClient.get(
            `/v8/finance/chart/${encodeURIComponent(symbol)}`,
            {
                params: {
                    range: "1d",
                    interval: "5m"
                }
            }
        );

        const result =
            response.data?.chart?.result?.[0];

        if (!result) {
            throw new Error(
                "No quote data returned from Yahoo."
            );
        }

        const meta = result.meta;

        const price =
            meta.regularMarketPrice ?? null;

        const previousClose =
            meta.previousClose ?? null;

        const change =
            price !== null &&
            previousClose !== null
                ? price - previousClose
                : null;

        const changePercent =
            change !== null &&
            previousClose
                ? (change / previousClose) * 100
                : null;

        return {

            symbol:
                meta.symbol || symbol,

            name:
                meta.longName ||
                meta.shortName ||
                meta.symbol ||
                symbol,

            price,

            previousClose,

            change,

            changePercent,

            dayHigh:
                meta.regularMarketDayHigh ?? null,

            dayLow:
                meta.regularMarketDayLow ?? null,

            currency:
                meta.currency || "INR",

            exchange:
                meta.exchangeName || null

        };

    } catch (error) {

        console.error(
            "Yahoo Indian company quote error:",
            error.response?.data ||
            error.message
        );

        throw new Error(
            `Failed to fetch quote for ${symbol}.`
        );

    }

};


module.exports = {
    getIndianCompanyQuote
};


if (require.main === module) {

    getIndianCompanyQuote("TCS.NS")

        .then((data) => {

            console.log(
                "🇮🇳 Indian Company Quote:"
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