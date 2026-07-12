const { StateGraph, START, END } = require("@langchain/langgraph");

const { GraphState } = require("./state");

const { searchNode } = require("./nodes/searchNode");
const { profileNode } = require("./nodes/profileNode");
const { financialNode } = require("./nodes/financialNode");
const { newsNode } = require("./nodes/newsNode");
const { riskNode } = require("./nodes/riskNode");
const { decisionNode } = require("./nodes/decisionNode");

const investmentGraph = new StateGraph(GraphState)

    // Nodes
    .addNode("searchCompany", searchNode)

    .addNode("fetchProfile", profileNode)

    .addNode("fetchFinancial", financialNode)

    .addNode("fetchNews", newsNode)

    .addNode("riskAnalysis", riskNode)

    .addNode("makeDecision", decisionNode)

    // Start
    .addEdge(START, "searchCompany")

    // Parallel Execution (Fan-out)
    .addEdge("searchCompany", "fetchProfile")

    .addEdge("searchCompany", "fetchFinancial")

    .addEdge("searchCompany", "fetchNews")

    // Wait for all three branches (Fan-in)
    .addEdge("fetchProfile", "riskAnalysis")

    .addEdge("fetchFinancial", "riskAnalysis")

    .addEdge("fetchNews", "riskAnalysis")

    // Continue
    .addEdge("riskAnalysis", "makeDecision")

    .addEdge("makeDecision", END)

    .compile();

module.exports = investmentGraph;