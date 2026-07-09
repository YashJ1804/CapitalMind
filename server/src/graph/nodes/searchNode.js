const { searchCompany } = require("../../tools/searchTool");

const searchNode = async (state) => {

    const stock = await searchCompany(state.company);

    return {

        symbol: stock.symbol

    };

};

module.exports = searchNode;