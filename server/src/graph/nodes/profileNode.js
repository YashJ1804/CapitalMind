const market = require("../../providers/marketProvider");

const profileNode = async (state) => {

    console.log("🏢 Profile Node", new Date().toLocaleTimeString());

    const profile = await market.getProfile(state.symbol);

    return {

        profile

    };

};

module.exports = {

    profileNode

};