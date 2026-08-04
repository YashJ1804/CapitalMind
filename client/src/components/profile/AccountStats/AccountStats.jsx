import StatsCard from "../../StatsCard/StatsCard";

function AccountStats({ stats }) {

    return (

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

            <StatsCard
                title="📈 Total Analyses"
                value={stats?.totalAnalyses ?? 0}
                color="text-blue-400"
                subtitle="AI Reports"
            />

            <StatsCard
                title="⭐ Watchlist"
                value={stats?.totalWatchlist ?? 0}
                color="text-yellow-400"
                subtitle="Saved Stocks"
            />

            <StatsCard
                title="💼 Portfolio"
                value={stats?.portfolioHoldings ?? 0}
                color="text-green-400"
                subtitle="Current Holdings"
            />

            <StatsCard
                title="🎯 Avg Score"
                value={stats?.averageScore ?? 0}
                color="text-purple-400"
                subtitle="Investment Rating"
            />

        </div>

    );

}

export default AccountStats;