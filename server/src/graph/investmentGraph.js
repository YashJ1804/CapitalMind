const { StateGraph, START, END } = require("@langchain/langgraph");

const { GraphState } = require("./state");

const { searchNode } = require("./nodes/searchNode");
const { profileNode } = require("./nodes/profileNode");
const { financialNode } = require("./nodes/financialNode");
const { newsNode } = require("./nodes/newsNode");
const { decisionNode } = require("./nodes/decisionNode");


const investmentGraph = new StateGraph(GraphState)

    .addNode("searchCompany", searchNode)

    .addNode("fetchProfile", profileNode)

    .addNode("fetchFinancial", financialNode)

    .addNode("fetchNews", newsNode)

    .addNode("makeDecision", decisionNode)

    .addEdge(START, "searchCompany")

    .addEdge("searchCompany", "fetchProfile")

    .addEdge("fetchProfile", "fetchFinancial")

    .addEdge("fetchFinancial", "fetchNews")

    .addEdge("fetchNews", "makeDecision")

    .addEdge("makeDecision", END)

    .compile();

module.exports = investmentGraph;