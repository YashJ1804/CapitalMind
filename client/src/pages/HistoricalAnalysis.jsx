import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";
import AppLayout from "../layouts/AppLayout";

import MarketOverview from "../components/market/MarketOverview/MarketOverview";
import StockChart from "../components/market/StockChart/StockChart";
import NewsSection from "../components/market/NewsSection/NewsSection";

import RecommendationCard from "../components/ai/RecommendationCard/RecommendationCard";
import Summary from "../components/ai/Summary/Summary";
import Reasoning from "../components/ai/Reasoning/Reasoning";
import ProsCons from "../components/ai/ProsCons/ProsCons";
import Risks from "../components/ai/Risks/Risks";
import FutureOutlook from "../components/ai/FutureOutlook/FutureOutlook";

export default function HistoricalAnalysis() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [history, setHistory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchHistoricalAnalysis = async () => {

            try {

                const response = await api.get(
                    `/history/${id}`
                );

                setHistory(
                    response.data.data
                );

            } catch (error) {

                console.error(
                    "Failed to load historical analysis:",
                    error
                );

                toast.error(
                    error.response?.data?.message ||
                    "Failed to load historical analysis."
                );

                navigate("/history");

            } finally {

                setLoading(false);

            }

        };

        fetchHistoricalAnalysis();

    }, [id, navigate]);


    if (loading) {

        return (

            <AppLayout>

                <div className="flex min-h-[50vh] items-center justify-center">

                    <div className="text-center">

                        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500" />

                        <p className="mt-4 text-slate-400">
                            Loading historical analysis...
                        </p>

                    </div>

                </div>

            </AppLayout>

        );

    }


    if (!history) {
        return null;
    }


    return (

        <AppLayout>

            <div className="space-y-8">

                {/* Header */}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <button
                            onClick={() => navigate("/history")}
                            className="mb-4 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
                        >
                            ← Back to History
                        </button>

                        <h1 className="text-4xl font-black text-white">
                            📜 Historical Analysis
                        </h1>

                        <p className="mt-2 text-slate-400">
                            Saved analysis for {history.company}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            Analyzed on{" "}
                            {new Date(
                                history.createdAt
                            ).toLocaleString()}
                        </p>

                    </div>

                </div>


                {/* Market Overview + Chart */}

                {history.profile &&
                    history.quote &&
                    history.chart && (

                        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">

                            <div className="xl:col-span-1">

                                <MarketOverview
                                    profile={history.profile}
                                    quote={history.quote}
                                />

                            </div>

                            <div className="xl:col-span-2">

                                <StockChart
                                    chart={history.chart}
                                />

                            </div>

                        </div>

                    )}


                {/* Recommendation */}

                {history.profile && (

                    <RecommendationCard
                        profile={history.profile}
                        result={history}
                    />

                )}


                {/* Summary */}

                {history.summary && (

                    <Summary
                        summary={history.summary}
                    />

                )}


                {/* Reasoning */}

                {history.reasoning && (

                    <Reasoning
                        reasoning={history.reasoning}
                    />

                )}


                {/* Pros / Cons */}

                {(history.pros || history.cons) && (

                    <ProsCons
                        pros={history.pros || []}
                        cons={history.cons || []}
                    />

                )}


                {/* Risks */}

                {history.risks && (

                    <Risks
                        risks={history.risks}
                    />

                )}


                {/* Future Outlook */}

                {history.outlook && (

                    <FutureOutlook
                        outlook={history.outlook}
                    />

                )}


                {/* News */}

                {history.news &&
                    history.news.length > 0 && (

                        <NewsSection
                            news={history.news}
                        />

                    )}

            </div>

        </AppLayout>

    );

}