const { makeInvestmentDecision } = require("../../agents/decisionAgent");

const decisionNode = async (state) => {

    console.log("🤖 Decision Node", new Date().toLocaleTimeString());

    const analysis = await makeInvestmentDecision(

        state.profile,

        state.quote,

        state.news || [],

        state.risk

    );

    return {

        analysis

    };

};

module.exports = {

    decisionNode

};