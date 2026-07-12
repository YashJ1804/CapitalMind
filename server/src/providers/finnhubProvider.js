const { searchCompany } = require("../tools/searchTool");
const { getCompanyProfile } = require("../tools/companyTool");
const { getQuote } = require("../tools/financialTool");
const { getChartData } = require("../tools/chartTool");
const { getCompanyNews } = require("../tools/newsTool");

const finnhubProvider = {

    search: searchCompany,

    getProfile: getCompanyProfile,

    getQuote,

    getChart: getChartData,

    getNews: getCompanyNews

};

module.exports = finnhubProvider;