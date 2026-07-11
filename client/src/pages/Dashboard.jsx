import { useEffect, useState } from "react";
import api from "../services/api";
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

            <div className="text-white text-center mt-20">

                Loading Dashboard...

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto p-8 text-white">

            <h1 className="text-4xl font-bold mb-10">

                📊 Dashboard

            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                <StatsCard

                    title="Analyses"

                    value={stats.totalAnalyses}

                    color="text-blue-400"

                />

                <StatsCard

                    title="Watchlist"

                    value={stats.totalWatchlist}

                    color="text-yellow-400"

                />

                <StatsCard

                    title="BUY Calls"

                    value={stats.buyCount}

                    color="text-green-400"

                />

                <StatsCard

                    title="Avg Score"

                    value={stats.averageScore}

                    color="text-purple-400"

                />

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mt-10">

                <h2 className="text-2xl font-bold mb-5">

                    Recent Analysis

                </h2>

                {

                    stats.lastAnalysis ? (

                        <>

                            <h3 className="text-xl font-semibold">

                                {stats.lastAnalysis.company}

                            </h3>

                            <p className="mt-2">

                                Recommendation :

                                <span className="ml-2 text-green-400">

                                    {stats.lastAnalysis.recommendation}

                                </span>

                            </p>

                            <p className="mt-2">

                                Score :

                                {stats.lastAnalysis.score}

                            </p>

                        </>

                    ) : (

                        <p>

                            No Analysis Yet

                        </p>

                    )

                }

            </div>

        </div>

    );

}

export default Dashboard;