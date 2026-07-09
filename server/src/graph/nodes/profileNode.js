const { getCompanyProfile } = require("../../tools/companyTool");

const profileNode = async (state) => {

    const profile = await getCompanyProfile(state.symbol);

    return {

        profile

    };

};

module.exports = profileNode;