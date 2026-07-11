import { useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import SearchBar from "../components/SearchBar/SearchBar";
import Loader from "../components/Loader/Loader";
import RecommendationCard from "../components/RecommendationCard/RecommendationCard";
import Summary from "../components/Summary/Summary";
import ProsCons from "../components/ProsCons/ProsCons";
import Risks from "../components/Risks/Risks";
import FutureOutlook from "../components/FutureOutlook/FutureOutlook";
import Reasoning from "../components/Reasoning/Reasoning";
import MarketOverview from "../components/MarketOverview/MarketOverview";
import News from "../components/News/News";
import AIInsights from "../components/AIInsights/AIInsights";
import NewsSection from "../components/NewsSection/NewsSection";
import StockChart from "../components/StockChart/StockChart";
import SkeletonLoader from "../components/SkeletonLoader/SkeletonLoader";
import api from "../services/api";

function Home() {
    const [company, setCompany] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const handleAnalyze = async () => {

        if (!company.trim()) return;

        setLoading(true);
        setResult(null);
        setError("");

        try {

            const response = await api.post("/analyze", {
                company: company.trim(),
            });
            console.log(response.data.data);

            setResult(response.data.data);

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                "Failed to analyze company. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">

                <div className="max-w-6xl mx-auto">

                    {/* Hero */}

<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center leading-tight">

    AI Investment Advisor

</h1>

<p className="text-slate-400 text-base sm:text-lg md:text-xl text-center mt-6 max-w-3xl mx-auto">

    Invest Smarter with Artificial Intelligence

</p>

                    {/* Search */}

                   <div className="mt-10 sm:mt-12 max-w-3xl mx-auto">

                        <SearchBar
                            company={company}
                            setCompany={setCompany}
                            handleAnalyze={handleAnalyze}
                            loading={loading}
                        />

                    </div>
                    {!loading && !result && !error && (

    <div className="mt-20">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center">

            <div className="text-6xl mb-6">

                📈

            </div>

            <h2 className="text-4xl font-bold">

                Analyze Any Public Company

            </h2>

            <p className="text-slate-400 mt-6 text-lg">

                Get AI-powered investment recommendations,

                live market data, company news,

                risk analysis and long-term outlook.

            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">

                {["Apple", "Microsoft", "NVIDIA", "Tesla", "Amazon", "Reliance"].map((stock) => (

                    <button

                        key={stock}

                        onClick={() => setCompany(stock)}

                        className="px-5 py-2 rounded-full bg-slate-800 hover:bg-slate-700 transition"

                    >

                        {stock}

                    </button>

                ))}

            </div>

        </div>

    </div>

)}

                    {error && (

    <div className="mt-8">

        <div className="bg-red-500/10 border border-red-500 rounded-2xl p-8 text-center">

            <div className="text-5xl mb-4">

                ❌

            </div>

            <h2 className="text-3xl font-bold text-red-400">

                Analysis Failed

            </h2>

            <p className="mt-4 text-slate-300">

                {error}

            </p>

            <button

                onClick={() => setError("")}

                className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 rounded-xl font-semibold transition"

            >

                Dismiss

            </button>

        </div>

    </div>

)}

                    {/* Loader */}

                    {loading && (

                        <div className="max-w-7xl mx-auto mt-10">

            <SkeletonLoader />

        </div>

                    )}

                    {/* Dashboard */}

                    {!loading && result && (

                        <div className="mt-12 space-y-8">

                           <RecommendationCard
    result={result.analysis}
    profile={result.profile}
/>
<AIInsights
    analysis={result.analysis}
/>

<MarketOverview
    profile={result.profile}
    quote={result.quote}
/>
<StockChart

    chart={result.chart}

/>
<NewsSection

    news={result.news}

/>

<Summary
    summary={result.analysis.summary}
/>

<ProsCons
    pros={result.analysis.pros}
    cons={result.analysis.cons}
/>

<Risks
    risks={result.analysis.risks}
/>

<FutureOutlook
    outlook={result.analysis.futureOutlook}
/>

<Reasoning
    reasoning={result.analysis.reasoning}
/>

                        </div>

                    )}

                </div>

            </div>

        </>
    );
}

export default Home;