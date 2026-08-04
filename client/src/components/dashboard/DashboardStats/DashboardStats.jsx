import {
  BarChart3,
  TrendingUp,
  Bookmark,
  Wallet,
} from "lucide-react";

import StatsCard from "../../StatsCard/StatsCard";

export default function DashboardStats({
  stats = {
    totalAnalyses: 0,
    buyRecommendations: 0,
    watchlist: 0,
    portfolioValue: "$0",
  },
}) {
  const cards = [
    {
      title: "Total Analyses",
      value: stats.totalAnalyses,
      subtitle: "Companies analyzed",
      icon: <BarChart3 size={22} />,
      trend: "+12%",
    },
    {
      title: "Buy Recommendations",
      value: stats.buyRecommendations,
      subtitle: "AI BUY signals",
      icon: <TrendingUp size={22} />,
      trend: "+5%",
    },
    {
      title: "Watchlist",
      value: stats.watchlist,
      subtitle: "Saved companies",
      icon: <Bookmark size={22} />,
      trend: "+2",
    },
    {
      title: "Portfolio",
      value: stats.portfolioValue,
      subtitle: "Current value",
      icon: <Wallet size={22} />,
      trend: "+8%",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <StatsCard
          key={card.title}
          title={card.title}
          value={card.value}
          subtitle={card.subtitle}
          icon={card.icon}
          trend={card.trend}
        />
      ))}
    </div>
  );
}