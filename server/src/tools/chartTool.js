const axios = require("axios");

const getChartData = async (symbol) => {

    const to = Math.floor(Date.now() / 1000);

    const from = to - (30 * 24 * 60 * 60);

    const { data } = await axios.get(

        "https://finnhub.io/api/v1/stock/candle",

        {

            params: {

                symbol,
                resolution: "D",
                from,
                to,
                token: process.env.FINNHUB_API_KEY

            }

        }

    );

    return data;

};

module.exports = {

    getChartData

};