const axios = require("axios");

const httpClient = axios.create({
    baseURL: "https://finnhub.io/api/v1",
    timeout: 30000,
});

module.exports = httpClient;