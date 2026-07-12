import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar/Navbar";
import HeroSection from "../components/HeroSection/HeroSection";
import StatsSection from "../components/StatsSection/StatsSection";
import FeaturesSection from "../components/FeaturesSection/FeaturesSection";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import MarketSnapshot from "../components/MarketSnapshot/MarketSnapshot";

import RecommendationCard from "../components/RecommendationCard/RecommendationCard";
import AIInsights from "../components/AIInsights/AIInsights";
import MarketOverview from "../components/MarketOverview/MarketOverview";
import StockChart from "../components/StockChart/StockChart";
import NewsSection from "../components/NewsSection/NewsSection";
import Summary from "../components/Summary/Summary";
import ProsCons from "../components/ProsCons/ProsCons";
import Risks from "../components/Risks/Risks";
import FutureOutlook from "../components/FutureOutlook/FutureOutlook";
import Reasoning from "../components/Reasoning/Reasoning";

import api from "../services/api";

function Home() {

    const [company, setCompany] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingStage, setLoadingStage] = useState("");
    const [result, setResult] = useState(null);
    const [market, setMarket] = useState(null);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { isAuthenticated } = useAuth();

    useEffect(() => {

        const fetchMarket = async () => {

            try {

                const res = await api.get("/market");

                setMarket(res.data.data);

            }

            catch (error) {

                console.error("Market fetch failed:", error);

            }

        };

        fetchMarket();

    }, []);

    const handleAnalyze = async () => {

        if (!company.trim()) return;

        if (!isAuthenticated) {

            toast("🔒 Please login to analyze stocks.", {

                icon: "🔒"

            });

            navigate("/login");

            return;

        }

        setLoading(true);
        setLoadingStage("🔍 Searching Company...");
        setResult(null);
        setError("");

        const timer1 = setTimeout(() => {

            setLoadingStage("🏢 Fetching Company Profile...");

        }, 2500);

        const timer2 = setTimeout(() => {

            setLoadingStage("💰 Loading Financial Data...");

        }, 5000);

        const timer3 = setTimeout(() => {

            setLoadingStage("📰 Reading Latest News...");

        }, 8000);

        const timer4 = setTimeout(() => {

            setLoadingStage("🤖 AI is Making Investment Decision...");

        }, 12000);

        try {

            const response = await api.post("/analyze", {

                company: company.trim()

            });

            setResult(response.data.data);

        }

        catch (err) {

            console.error(err);

            setError(

                err.response?.data?.message ||

                "Failed to analyze company."

            );

        }

        finally {

            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);

            setLoading(false);
            setLoadingStage("");

        }

    };

    return (

        <>

            <Navbar />

            <div
                className="
                min-h-screen
                bg-slate-950
                text-white
                px-4
                sm:px-6
                lg:px-8
                pt-32
                pb-20
                "
            >

                <div className="max-w-7xl mx-auto">

                    <HeroSection

                        company={company}

                        setCompany={setCompany}

                        handleAnalyze={handleAnalyze}

                        loading={loading}

                    />

                    

                    {

                        market && (

                            <div className="mt-28">

                                <MarketSnapshot

                                    market={market}

                                    setCompany={setCompany}

                                />

                            </div>

                        )

                    }

                    {

                        loading && (

                            <div className="mt-16 flex justify-center">

                                <div
                                    className="
                                    bg-slate-900
                                    border
                                    border-slate-800
                                    rounded-2xl
                                    px-8
                                    py-5
                                    flex
                                    items-center
                                    gap-4
                                    shadow-xl
                                    "
                                >

                                    <div
                                        className="
                                        h-5
                                        w-5
                                        rounded-full
                                        border-2
                                        border-cyan-400
                                        border-t-transparent
                                        animate-spin
                                        "
                                    />

                                    <p className="text-lg">

                                        {loadingStage}

                                    </p>

                                </div>

                            </div>

                        )

                    }

                    {

                        error && (

                            <div className="mt-12">

                                <div
                                    className="
                                    bg-red-500/10
                                    border
                                    border-red-500/40
                                    rounded-3xl
                                    p-10
                                    text-center
                                    "
                                >

                                    <h2 className="text-3xl font-bold text-red-400">

                                        Analysis Failed

                                    </h2>

                                    <p className="mt-5">

                                        {error}

                                    </p>

                                    <button

                                        onClick={() => setError("")}

                                        className="
                                        mt-8
                                        px-6
                                        py-3
                                        rounded-xl
                                        bg-red-500
                                        hover:bg-red-600
                                        transition
                                        "
                                    >

                                        Dismiss

                                    </button>

                                </div>

                            </div>

                        )

                    }

                    {

                        !loading && result?.analysis && (

                            <div className="mt-20 space-y-10">

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

                        )

                    }
                    <div className="mt-28">

                        <StatsSection />

                    </div>

                    <div className="mt-28">

                        <FeaturesSection />

                    </div>

                    <div className="mt-28">

                        <HowItWorks />

                    </div>

                </div>

                {/* Footer */}

                <footer className="mt-32 border-t border-slate-800 bg-slate-950">

                    <div className="max-w-7xl mx-auto px-6 py-20">

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">

                            {/* Brand */}

                            <div>

                                <h2 className="text-3xl font-black">

                                    📈 CapitalMind

                                </h2>

                                <p className="mt-6 text-slate-400 leading-8">

                                    AI-powered investment intelligence platform
                                    that combines live market data, financial
                                    fundamentals, company news and Gemini AI to
                                    help investors make smarter decisions.

                                </p>

                            </div>

                            {/* Technology */}

                            <div>

                                <h3 className="text-xl font-bold">

                                    Built With

                                </h3>

                                <div className="mt-6 space-y-3 text-slate-400">

                                    <p>⚛ React</p>

                                    <p>🟢 Node.js</p>

                                    <p>🍃 MongoDB</p>

                                    <p>🤖 Gemini AI</p>

                                    <p>📈 Finnhub API</p>

                                    <p>🎨 Tailwind CSS</p>

                                </div>

                            </div>

                            {/* Platform */}

                            <div>

                                <h3 className="text-xl font-bold">

                                    Platform

                                </h3>

                                <div className="mt-6 space-y-3 text-slate-400">

                                    <p>✔ AI Stock Analysis</p>

                                    <p>✔ Market Dashboard</p>

                                    <p>✔ Investment History</p>

                                    <p>✔ Personal Watchlist</p>

                                    <p>✔ Interactive Charts</p>

                                    <p>✔ News Intelligence</p>

                                </div>

                            </div>

                        </div>

                        <div className="mt-16 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

                            <p className="text-slate-500">

                                © 2026 CapitalMind. All Rights Reserved.

                            </p>

                            <p className="text-slate-600 text-sm">

                                Built with ❤️ using React • Node.js • MongoDB • Gemini AI

                            </p>

                        </div>

                    </div>

                </footer>

            </div>

        </>

    );

}

export default Home;