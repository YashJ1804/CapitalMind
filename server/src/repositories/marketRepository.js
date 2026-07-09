const httpClient = require("../services/httpClient");

const search = async (company) => {

    const { data } = await httpClient.get("/search", {
        params: {
            q: company,
            token: process.env.FINNHUB_API_KEY
        }
    });

    return data;
};

const profile = async (symbol) => {

    const { data } = await httpClient.get("/stock/profile2", {
        params: {
            symbol,
            token: process.env.FINNHUB_API_KEY
        }
    });

    return data;
};

const quote = async (symbol) => {

    const { data } = await httpClient.get("/quote", {
        params: {
            symbol,
            token: process.env.FINNHUB_API_KEY
        }
    });

    return data;
};

module.exports = {
    search,
    profile,
    quote
};