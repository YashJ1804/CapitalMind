const axios = require("axios");

const yahooClient = axios.create({
    baseURL: "https://query1.finance.yahoo.com",
    timeout: 10000,
    headers: {
        "User-Agent": "Mozilla/5.0"
    }
});

const getIndexData = async (symbol, name) => {

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

        const result = response.data.chart.result?.[0];

        if (!result) {
            throw new Error("No market data returned.");
        }

        const meta = result.meta;

        const price = meta.regularMarketPrice;
        const previousClose = meta.previousClose;

        const change = price - previousClose;

        const changePercent =
            (change / previousClose) * 100;

        return {
            name,
            symbol,
            price,
            previousClose,
            change,
            changePercent,
            currency: "INR"
        };

    } catch (error) {

        console.error(
            `Yahoo Finance error for ${symbol}:`,
            error.response?.data || error.message
        );

        throw new Error(
            `Failed to fetch market data for ${symbol}`
        );

    }

};
const getHistoricalData = async (
    symbol,
    range = "1mo",
    interval = "1d"
) => {

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

        const result = response.data.chart.result?.[0];

        if (!result) {
            throw new Error(
                "No historical market data returned."
            );
        }

        const timestamps = result.timestamp || [];

        const quote = result.indicators?.quote?.[0];

        if (!quote) {
            throw new Error(
                "Historical price data unavailable."
            );
        }

        const historicalData = timestamps.map(
            (timestamp, index) => ({
                timestamp,
                date: new Date(
                    timestamp * 1000
                ),

                open: quote.open?.[index] ?? null,

                high: quote.high?.[index] ?? null,

                low: quote.low?.[index] ?? null,

                close: quote.close?.[index] ?? null,

                volume: quote.volume?.[index] ?? null
            })
        ).filter(
            (item) => item.close !== null
        );

        return historicalData;

    } catch (error) {

        console.error(
            `Yahoo historical data error for ${symbol}:`,
            error.response?.data || error.message
        );

        throw new Error(
            `Failed to fetch historical data for ${symbol}`
        );

    }

};

const getIndianIndices = async () => {

    const [nifty, sensex, bankNifty] = await Promise.all([

        getIndexData(
            "^NSEI",
            "NIFTY 50"
        ),

        getIndexData(
            "^BSESN",
            "SENSEX"
        ),

        getIndexData(
            "^NSEBANK",
            "BANK NIFTY"
        )

    ]);

    return {
        nifty50: nifty,
        sensex: sensex,
        bankNifty: bankNifty
    };

};

module.exports = {
    getIndexData,
    getIndianIndices,
    getHistoricalData
};

if (require.main === module) {

    getIndianIndices()

        .then((data) => {

            console.log(
                "🇮🇳 Indian Market Data:"
            );

            console.dir(
                data,
                { depth: null }
            );

        })

        .catch((error) => {

            console.error(
                "❌",
                error.message
            );

        });

}