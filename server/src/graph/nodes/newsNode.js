const { getCompanyNews } = require("../../tools/newsTool");

const newsNode = async (state) => {
    console.log("📰 News Node");
    const news = await getCompanyNews(state.symbol);

    return {


        ...state,
        news

    };

};

module.exports = {
    newsNode
};