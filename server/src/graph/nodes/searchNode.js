const { searchCompany } = require("../../tools/searchTool");

const searchNode = async (state) => {

    console.log("🔍 LangGraph: Search Node");

    const stock = await searchCompany(state.company);

    return {

        ...state,

        symbol: stock.symbol

    };

};

module.exports = {

    searchNode

};