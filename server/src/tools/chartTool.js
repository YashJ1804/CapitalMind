const axios = require("axios");

const getChartData = async (symbol) => {
    if (!symbol || !symbol.trim()) {
        throw new Error("Stock symbol is required.");
    }

    const cleanSymbol = symbol.trim().toUpperCase();

    try {
        const response = await axios.get(
            "https://api.twelvedata.com/time_series",
            {
                params: {
                    symbol: cleanSymbol,
                    interval: "1day",
                    outputsize: 30,
                    apikey: process.env.TWELVE_DATA_API_KEY
                },
                timeout: 10000
            }
        );

        const data = response.data;

        console.log(
            `📈 Twelve Data Chart: ${cleanSymbol} → ${data?.status || "ok"}`
        );

        if (!data) {
            throw new Error(
                "Twelve Data returned an empty response."
            );
        }

        if (data.status === "error") {
            throw new Error(
                data.message || `Unable to fetch chart data for ${cleanSymbol}.`
            );
        }

        if (
            !Array.isArray(data.values) ||
            data.values.length === 0
        ) {
            throw new Error(
                `No chart data available for ${cleanSymbol}.`
            );
        }

        /*
         * Convert Twelve Data format into the format
         * already expected by CapitalMind's StockChart.
         *
         * Twelve Data:
         * values: [
         *   {
         *     datetime,
         *     open,
         *     high,
         *     low,
         *     close,
         *     volume
         *   }
         * ]
         *
         * CapitalMind / existing chart components:
         * c: [],
         * o: [],
         * h: [],
         * l: [],
         * t: [],
         * v: []
         */

        const values = [...data.values].reverse();

        const chartData = {
            c: values.map((item) => Number(item.close)),
            o: values.map((item) => Number(item.open)),
            h: values.map((item) => Number(item.high)),
            l: values.map((item) => Number(item.low)),
            v: values.map((item) => Number(item.volume)),
            t: values.map((item) =>
                Math.floor(
                    new Date(`${item.datetime}T00:00:00Z`).getTime() / 1000
                )
            ),
            s: "ok"
        };

        if (
            chartData.c.length === 0 ||
            chartData.c.length !== chartData.t.length
        ) {
            throw new Error(
                `Invalid chart data returned for ${cleanSymbol}.`
            );
        }

        console.log(
            `✅ Chart data ready: ${cleanSymbol} → ${chartData.c.length} points`
        );

        return chartData;

    } catch (error) {

        console.error(
            "❌ Twelve Data chart error:",
            error.response?.data ||
            error.message
        );

        throw new Error(
            `Failed to fetch chart data for ${cleanSymbol}.`
        );
    }
};

module.exports = {
    getChartData
};