const market = require("../../providers/marketProvider");

const newsNode = async (state) => {

    console.log("📰 News Node", new Date().toLocaleTimeString());

    let news = [];

    try {

        news = await market.getNews(state.symbol);

    } catch (error) {

        console.log("⚠ News unavailable, continuing analysis...");
        console.log(error.message);

        news = [];

    }

    return {

        news

    };

};

module.exports = {

    newsNode

};