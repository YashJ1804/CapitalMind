const finnhub = require("./finnhubProvider");

const marketProvider = {

    async search(company) {

        return finnhub.search(company);

    },

    async getProfile(symbol) {

        console.log("🇺🇸 Using Finnhub Provider");

        return finnhub.getProfile(symbol);

    },

    async getQuote(symbol) {

        console.log("🇺🇸 Using Finnhub Provider");

        return finnhub.getQuote(symbol);

    },

    async getChart(symbol) {

        console.log("🇺🇸 Using Finnhub Provider");

        return finnhub.getChart(symbol);

    },

    async getNews(symbol) {

        console.log("🇺🇸 Using Finnhub Provider");

        return finnhub.getNews(symbol);

    }

};

module.exports = marketProvider;