const axios = require("axios");

const yahooClient = axios.create({
    baseURL: "https://query1.finance.yahoo.com",
    timeout: 10000,
    headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
    }
});


const getIndianCompanyHistory = async (
    symbol,
    range = "1mo",
    interval = "1d"
) => {

    if (!symbol) {
        throw new Error("Company symbol is required.");
    }

    try {

        const response = await yahooClient.get(
            `/v8/finance/chart/${encodeURIComponent(symbol)}`,
            {
                params: {
                    range,
                    interval
                }
            }
        );

        const result =
            response.data?.chart?.result?.[0];

        if (!result) {
            throw new Error(
                "No historical data returned."
            );
        }

        const timestamps =
            result.timestamp || [];

        const quote =
            result.indicators?.quote?.[0] || {};

        const closes =
            quote.close || [];

        const opens =
            quote.open || [];

        const highs =
            quote.high || [];

        const lows =
            quote.low || [];

        const volumes =
            quote.volume || [];


        const history = timestamps.map(
            (timestamp, index) => ({

                timestamp,

                date:
                    new Date(timestamp * 1000)
                        .toISOString(),

                open:
                    opens[index] ?? null,

                high:
                    highs[index] ?? null,

                low:
                    lows[index] ?? null,

                close:
                    closes[index] ?? null,

                volume:
                    volumes[index] ?? null

            })
        );


        return {

            symbol,

            range,

            interval,

            currency:
                result.meta?.currency || "INR",

            history

        };

    } catch (error) {

        console.error(
            "Yahoo Indian company history error:",
            error.response?.data ||
            error.message
        );

        throw new Error(
            `Failed to fetch history for ${symbol}.`
        );

    }

};


module.exports = {
    getIndianCompanyHistory
};


if (require.main === module) {

    getIndianCompanyHistory(
        "TCS.NS",
        "1mo",
        "1d"
    )

        .then((data) => {

            console.log(
                "🇮🇳 Indian Company History:"
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