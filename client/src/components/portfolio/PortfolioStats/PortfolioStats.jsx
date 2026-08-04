import StatsCard from "../../StatsCard/StatsCard";

function PortfolioStats({ summary, holdings }) {

    const totalInvestment = summary?.totalInvestment || 0;
    const currentValue = summary?.currentValue || 0;
    const totalProfitLoss = summary?.totalProfitLoss || 0;
    const totalReturnPercentage = summary?.totalReturnPercentage || 0;

    return (

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

            <StatsCard
                title="💰 Current Value"
                value={`$${currentValue.toFixed(2)}`}
                color="text-green-400"
                subtitle="Live Portfolio Value"
            />

            <StatsCard
                title="💵 Total Investment"
                value={`$${totalInvestment.toFixed(2)}`}
                color="text-blue-400"
                subtitle="Capital Invested"
            />

            <StatsCard
                title="📈 Profit / Loss"
                value={`$${totalProfitLoss.toFixed(2)}`}
                color={
                    totalProfitLoss >= 0
                        ? "text-green-400"
                        : "text-red-400"
                }
                subtitle={`${totalReturnPercentage.toFixed(2)}% Return`}
            />

            <StatsCard
                title="🏢 Holdings"
                value={holdings.length}
                color="text-yellow-400"
                subtitle="Companies Owned"
            />

        </div>

    );

}

export default PortfolioStats;