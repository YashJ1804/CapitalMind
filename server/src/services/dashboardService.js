const { getEnrichedPortfolio } = require("./portfolioDataService");

const getDashboardSummary = async (userId) => {

    const portfolio = await getEnrichedPortfolio(userId);

    const totalInvested = portfolio.reduce(
        (sum, stock) => sum + stock.investedValue,
        0
    );

    const portfolioValue = portfolio.reduce(
        (sum, stock) => sum + stock.currentValue,
        0
    );

    const totalProfit = portfolioValue - totalInvested;

    const profitPercentage =
        totalInvested === 0
            ? 0
            : (totalProfit / totalInvested) * 100;

    return {
        portfolioValue,
        totalInvested,
        totalProfit,
        profitPercentage
    };

};

const getSectorAllocation = async (userId) => {

    const portfolio = await getEnrichedPortfolio(userId);

    const sectorMap = {};

    portfolio.forEach((stock) => {

        const sector = stock.profile?.industry || "Unknown";

        sectorMap[sector] =
            (sectorMap[sector] || 0) + stock.currentValue;

    });

    const totalValue = Object.values(sectorMap).reduce(
        (sum, value) => sum + value,
        0
    );

    return Object.entries(sectorMap).map(([sector, value]) => ({
        sector,
        value,
        percentage:
            totalValue === 0
                ? 0
                : Number(((value / totalValue) * 100).toFixed(2))
    }));

};

const getTopPerformers = async (userId) => {

    const portfolio = await getEnrichedPortfolio(userId);

    const sortedPortfolio = [...portfolio].sort(
        (a, b) => b.profitPercentage - a.profitPercentage
    );

    return {

        gainers: sortedPortfolio.slice(0, 5),

        losers: [...sortedPortfolio]
            .reverse()
            .slice(0, 5)

    };

};

module.exports = {
    getDashboardSummary,
    getSectorAllocation,
    getTopPerformers
};