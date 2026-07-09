const { getCompanyNews } = require("../../tools/newsTool");

const newsNode = async (state) => {

    const news = await getCompanyNews(state.symbol);

    return {

        news

    };

};

module.exports = newsNode;