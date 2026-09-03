import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
import WeeklyChart from "../components/market/WeeklyChart/WeeklyChart";
import FutureOutlook from "../components/ai/FutureOutlook/FutureOutlook";

import IndianCompanySearch from "../components/market/IndianCompany/IndianCompanySearch";
import NewsSection from "../components/market/NewsSection/NewsSection";

export default function Analyze() {

    const [searchParams] = useSearchParams();
    const [selectedIndianCompany, setSelectedIndianCompany] = useState(null);

    const [company, setCompany] = useState("");

    const [market, setMarket] = useState("USA");

    const [loading, setLoading] = useState(false);

    const [profile, setProfile] = useState(null);

    const [quote, setQuote] = useState(null);

    const [chart, setChart] = useState(null);

    const [result, setResult] = useState(null);

    const [news, setNews] = useState([]);


    // =====================================================
    // ANALYZE COMPANY
    // =====================================================

    const handleAnalyze = async () => {

    if (!company.trim()) {
        toast.error("Please enter a company name.");
        return;
    }

    try {

        setLoading(true);

        const response = await api.post(
            "/analyze",
            {
                company,
                market
            }
        );

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
       setResult({
    ...analysis,
    outlook:
        analysis.outlook ||
        analysis.futureOutlook ||
        ""
});
        setNews(news || []);

        toast.success(
            "Analysis completed successfully."
        );

    } catch (error) {

        console.error(
            "Analysis failed:",
            error
        );

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


    // =====================================================
    // ANALYZE COMPANY FROM URL
    // =====================================================

    useEffect(() => {

        const companyFromUrl =
            searchParams.get("company");


        if (!companyFromUrl) {
            return;
        }


        setCompany(companyFromUrl);


        const analyzeCompany =
            async () => {

                try {

                    setLoading(true);


                    const response =
                        await api.post(
                            "/analyze",
                            {
                                company:
                                    companyFromUrl,

                                market
                            }
                        );


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

                   setResult({
    ...analysis,
    outlook:
        analysis.outlook ||
        analysis.futureOutlook ||
        ""
});

                    setNews(news || []);


                    toast.success(
                        "Analysis completed successfully."
                    );


                } catch (error) {

                    console.error(
                        "Analysis failed:",
                        error
                    );


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


        analyzeCompany();


    }, [searchParams, market]);


    // =====================================================
    // CLEAR OLD RESULTS WHEN MARKET CHANGES
    // =====================================================

    const handleMarketChange = (newMarket) => {

    setMarket(newMarket);

    setCompany("");

    setSelectedIndianCompany(null);

    setProfile(null);
    setQuote(null);
    setChart(null);
    setResult(null);
    setNews([]);

};


    // =====================================================
    // UI
    // =====================================================

    return (

        <AppLayout>

            <div className="space-y-8">

                {loading && (
    <div className="flex items-center gap-4 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-5 py-4">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-600 border-t-cyan-400" />

        <div>
            <p className="font-semibold text-white">
                Analyzing now...
            </p>

            <p className="mt-1 text-sm text-slate-400">
                Please wait while CapitalMind analyzes the company and generates your investment insights.
            </p>
        </div>
    </div>
)}


                {/* =========================================
                    MARKET SWITCH
                ========================================== */}

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-2">

                    <div className="grid grid-cols-2 gap-2">


                        {/* INDIA */}

                        <button
                            type="button"
                            onClick={() =>
                                handleMarketChange(
                                    "INDIA"
                                )
                            }
                            className={`
                                rounded-xl
                                px-6
                                py-3
                                font-bold
                                transition
                                ${
                                    market === "INDIA"
                                        ? "bg-blue-600 text-white"
                                        : "text-slate-400 hover:bg-slate-800"
                                }
                            `}
                        >

                            🇮🇳 India

                        </button>


                        {/* USA */}

                        <button
                            type="button"
                            onClick={() =>
                                handleMarketChange(
                                    "USA"
                                )
                            }
                            className={`
                                rounded-xl
                                px-6
                                py-3
                                font-bold
                                transition
                                ${
                                    market === "USA"
                                        ? "bg-blue-600 text-white"
                                        : "text-slate-400 hover:bg-slate-800"
                                }
                            `}
                        >

                            🇺🇸 USA

                        </button>

                    </div>

                </div>


                {/* =========================================
                    SEARCH
                ========================================== */}

                {market === "INDIA" ? (

    <IndianCompanySearch
        onSelect={async (selectedCompany) => {

            setSelectedIndianCompany(
                selectedCompany
            );

            setCompany(
                selectedCompany.symbol
            );

            try {

                setLoading(true);

                const response =
                    await api.post(
                        "/analyze",
                        {
                            company:
                                selectedCompany.symbol,

                            market:
                                "INDIA"
                        }
                    );


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


                toast.success(
                    "Analysis completed successfully."
                );


            } catch (error) {

                console.error(
                    "Indian analysis failed:",
                    error
                );


                toast.error(
                    error.response?.data?.message ||
                    "Failed to analyze Indian company."
                );


                setProfile(null);
                setQuote(null);
                setChart(null);
                setResult(null);
                setNews([]);


            } finally {

                setLoading(false);

            }

        }}
    />

) : (

    <SearchBar
        company={company}
        setCompany={setCompany}
        loading={loading}
        handleAnalyze={handleAnalyze}
    />

)}


                {/* =========================================
                    MARKET OVERVIEW + CHART
                ========================================== */}

                {profile && quote && (

    <div className="grid grid-cols-1 gap-8">

        <MarketOverview
            profile={profile}
            quote={quote}
            market={market}
        />

        {chart && (
            <StockChart
                chart={chart}
            />
        )}
        {chart && (
            <WeeklyChart
                chart={chart}
                market={market}
            />
        )}

    </div>

)}


                {/* =========================================
                    RECOMMENDATION
                ========================================== */}

                {profile &&
                    result && (

                    <RecommendationCard
                        profile={profile}
                        result={result}
                    />

                )}


                {/* =========================================
                    AI SUMMARY
                ========================================== */}

                {result && (

                    <>

                        <Summary
                            summary={
                                result.summary
                            }
                        />


                        <Reasoning
                            reasoning={
                                result.reasoning
                            }
                        />


                        <ProsCons
                            pros={
                                result.pros
                            }
                            cons={
                                result.cons
                            }
                        />


                        <Risks
                            risks={
                                result.risks
                            }
                        />


                        <FutureOutlook
                            outlook={
                                result.outlook
                            }
                        />

                    </>

                )}


                {/* =========================================
                    NEWS
                ========================================== */}

                {news.length > 0 && (

                    <NewsSection
                        news={news}
                    />

                )}

            </div>

        </AppLayout>

    );

}