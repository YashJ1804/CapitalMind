import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar/Navbar";
import StatsCard from "../components/StatsCard/StatsCard";

function Dashboard() {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        const fetchStats = async () => {

            try {

                const res = await api.get("/dashboard/stats");

                setStats(res.data.stats);

            }

            catch (error) {

                console.log(error);

            }

        };

        fetchStats();

    }, []);

    if (!stats) {

        return (

            <>

                <Navbar />

                <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center pt-28">

                    <div className="text-center">

                        <div className="animate-pulse text-6xl">

                            📊

                        </div>

                        <p className="mt-6 text-xl text-slate-400">

                            Loading Dashboard...

                        </p>

                    </div>

                </div>

            </>

        );

    }

    return (

        <>

            <Navbar />

            <div className="min-h-screen bg-slate-950 text-white pt-28">

                <div className="max-w-7xl mx-auto px-6 py-12">

                    {/* Header */}

                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-12">

                        <div>

                            <h1 className="text-5xl font-black">

                                📊 Dashboard

                            </h1>

                            <p className="text-slate-400 mt-3">

                                Track your AI investment activity and performance.

                            </p>

                        </div>

                        <div className="mt-6 lg:mt-0">

                            <div className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4">

                                <p className="text-slate-500 text-sm">

                                    Last Updated

                                </p>

                                <h3 className="font-semibold mt-1">

                                    {new Date().toLocaleDateString()}

                                </h3>

                            </div>

                        </div>

                    </div>

                    {/* Stats */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                        <StatsCard

                            title="📈 Total Analyses"

                            value={stats.totalAnalyses}

                            color="text-blue-400"

                        />

                        <StatsCard

                            title="⭐ Watchlist"

                            value={stats.totalWatchlist}

                            color="text-yellow-400"

                        />

                        <StatsCard

                            title="🟢 BUY Calls"

                            value={stats.buyCount}

                            color="text-green-400"

                        />

                        <StatsCard

                            title="🎯 Avg Score"

                            value={stats.averageScore}

                            color="text-purple-400"

                        />

                    </div>

                    {/* Recent Analysis */}

                    <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 shadow-xl p-8">

                        <div className="flex justify-between items-center mb-8">

                            <div>

                                <h2 className="text-3xl font-black">

                                    🕒 Recent Analysis

                                </h2>

                                <p className="text-slate-500 mt-2">

                                    Your latest AI investment recommendation

                                </p>

                            </div>

                        </div>

                        {

                            stats.lastAnalysis ? (

                                <div className="grid md:grid-cols-3 gap-6">

                                    <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6">

                                        <p className="text-slate-500 uppercase text-xs tracking-widest">

                                            Company

                                        </p>

                                        <h3 className="text-3xl font-black mt-4">

                                            {stats.lastAnalysis.company}

                                        </h3>

                                    </div>

                                    <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6">

                                        <p className="text-slate-500 uppercase text-xs tracking-widest">

                                            Recommendation

                                        </p>

                                        <h3 className="text-green-400 text-3xl font-black mt-4">

                                            {stats.lastAnalysis.recommendation}

                                        </h3>

                                    </div>

                                    <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6">

                                        <p className="text-slate-500 uppercase text-xs tracking-widest">

                                            Investment Score

                                        </p>

                                        <h3 className="text-blue-400 text-3xl font-black mt-4">

                                            {stats.lastAnalysis.score}/100

                                        </h3>

                                    </div>

                                </div>

                            ) : (

                                <div className="rounded-2xl bg-slate-950 border border-slate-800 p-10 text-center">

                                    <div className="text-6xl">

                                        📭

                                    </div>

                                    <h3 className="mt-6 text-2xl font-bold">

                                        No Analysis Yet

                                    </h3>

                                    <p className="text-slate-500 mt-3">

                                        Analyze your first company to populate the dashboard.

                                    </p>

                                </div>

                            )

                        }

                    </div>

                </div>

            </div>

        </>

    );

}

export default Dashboard;