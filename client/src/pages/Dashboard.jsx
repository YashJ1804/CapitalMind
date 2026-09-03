import { useEffect, useState } from "react";
import api from "../services/api";

import AppLayout from "../layouts/AppLayout";

import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";
import WelcomeBanner from "../components/dashboard/WelcomeBanner/WelcomeBanner";
import DashboardStats from "../components/dashboard/DashboardStats/DashboardStats";
import QuickActions from "../components/dashboard/QuickActions/QuickActions";
import RecentAnalysis from "../components/dashboard/RecentAnalysis/RecentAnalysis";
import ActivityChart from "../components/dashboard/ActivityChart/ActivityChart";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard/stats");
        setStats(res.data.stats);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <AppLayout>
        <DashboardSkeleton />
      </AppLayout>
    );
  }

  const activityData = [
    { day: "Mon", analyses: 2 },
    { day: "Tue", analyses: 4 },
    { day: "Wed", analyses: 1 },
    { day: "Thu", analyses: 6 },
    { day: "Fri", analyses: 3 },
    { day: "Sat", analyses: 5 },
    { day: "Sun", analyses: 2 },
  ];

  const recentAnalyses = stats.lastAnalysis
    ? [
        {
          id: 1,
          company: stats.lastAnalysis.company,
          symbol: stats.lastAnalysis.symbol || "-",
          recommendation: stats.lastAnalysis.recommendation,
          confidence: stats.lastAnalysis.score,
          date: "Latest",
        },
      ]
    : [];

  return (
    <AppLayout>
      <div className="space-y-8">

        <WelcomeBanner
    onAnalyze={() => {
        window.location.href = "/analyze";
    }}
/>

        <DashboardStats
          stats={{
            totalAnalyses: stats.totalAnalyses,
            buyRecommendations: stats.buyCount,
            watchlist: stats.totalWatchlist,
            averageScore: stats.averageScore,
          }}
        />

        <QuickActions />

        <RecentAnalysis
          analyses={recentAnalyses}
        />

        <ActivityChart
          title="Analysis Activity"
          subtitle="Your recent activity"
          data={activityData}
        />

      </div>
    </AppLayout>
  );
}

export default Dashboard;