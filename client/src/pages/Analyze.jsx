import { useState } from "react";
import toast from "react-hot-toast";

import api from "../services/api";

import AppLayout from "../layouts/AppLayout";

import SearchBar from "../components/market/SearchBar/SearchBar";
import MarketOverview from "../components/market/MarketOverview/MarketOverview";
import StockChart from "../components/market/StockChart/StockChart";

import RecommendationCard from "../components/ai/RecommendationCard/RecommendationCard";
import Summary from "../components/ai/Summary/Summary";
import Reasoning from "../components/ai/Reasoning/Reasoning";
import ProsCons from "../components/ai/ProsCons/ProsCons";
import Risks from "../components/ai/Risks/Risks";
import FutureOutlook from "../components/ai/FutureOutlook/FutureOutlook";

import NewsSection from "../components/market/NewsSection/NewsSection";

export default function Analyze() {
    const [company, setCompany] = useState("");
    const [loading, setLoading] = useState(false);

    const [profile, setProfile] = useState(null);
    const [quote, setQuote] = useState(null);
    const [chart, setChart] = useState(null);
    const [result, setResult] = useState(null);
    const [news, setNews] = useState([]);

    const handleAnalyze = async () => {
        if (!company.trim()) {
            toast.error("Please enter a company name.");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post("/analyze", {
                company,
            });

            const {
    profile,
    quote,
    chart,
    analysis,
    news
} = response.data.data;

setProfile(profile);
setQuote(quote);
setChart(chart);
setResult(analysis);
setNews(news || []);

            toast.success("Analysis completed successfully.");

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to analyze company."
            );

            setProfile(null);
            setQuote(null);
            setChart(null);
            setResult(null);
            setNews([]);

        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout>
            <div className="space-y-8">

                <SearchBar
                    company={company}
                    setCompany={setCompany}
                    loading={loading}
                    handleAnalyze={handleAnalyze}
                />

                {profile && quote && chart && (
                    <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">

                        <div className="xl:col-span-1">
                            <MarketOverview
                                profile={profile}
                                quote={quote}
                            />
                        </div>

                        <div className="xl:col-span-2">
                            <StockChart
                                chart={chart}
                            />
                        </div>

                    </div>
                )}

                {profile && result && (
                    <RecommendationCard
                        profile={profile}
                        result={result}
                    />
                )}

                {result && (
                    <>
                        <Summary
                            summary={result.summary}
                        />

                        <Reasoning
                            reasoning={result.reasoning}
                        />

                        <ProsCons
                            pros={result.pros}
                            cons={result.cons}
                        />

                        <Risks
                            risks={result.risks}
                        />

                        <FutureOutlook
                            outlook={result.outlook}
                        />
                    </>
                )}

                {news.length > 0 && (
                    <NewsSection
                        news={news}
                    />
                )}

            </div>
        </AppLayout>
    );
}