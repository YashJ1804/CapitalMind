const { getCompanyProfile } = require("../../tools/companyTool");

const profileNode = async (state) => {

    console.log("🏢 Profile Node");

    const profile = await getCompanyProfile(state.symbol);

    return {

        ...state,

        profile

    };

};

module.exports = { profileNode };