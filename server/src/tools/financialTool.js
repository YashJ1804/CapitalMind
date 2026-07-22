const httpClient = require("../services/httpClient");

const getQuote = async (symbol) => {

    const { data } = await httpClient.get(

        "https://finnhub.io/api/v1/quote",

        {
            params: {
                symbol,
                token: process.env.FINNHUB_API_KEY
            }
        }

    );

    return {

        currentPrice: data.c,
        high: data.h,
        low: data.l,
        open: data.o,
        previousClose: data.pc,
        change: data.d,
        percentChange: data.dp

    };

};

module.exports = {

    getQuote

};