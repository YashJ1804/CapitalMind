import { useEffect, useState } from "react";

import api from "../services/api";

import AppLayout from "../layouts/AppLayout";

import PortfolioStats from "../components/portfolio/PortfolioStats/PortfolioStats";
import PortfolioSummary from "../components/portfolio/PortfolioSummary/PortfolioSummary";
import HoldingsTable from "../components/portfolio/HoldingsTable/HoldingsTable";
import EmptyPortfolio from "../components/portfolio/EmptyPortfolio/EmptyPortfolio";
import PortfolioSkeleton from "../components/portfolio/PortfolioSkeleton/PortfolioSkeleton";
import PortfolioAIInsights from "../components/portfolio/PortfolioAIInsights/PortfolioAIInsights";

export default function Portfolio() {

    const [loading, setLoading] = useState(true);

    const [summary, setSummary] = useState(null);

    const [holdings, setHoldings] = useState([]);

    const [portfolioAnalysis, setPortfolioAnalysis] = useState(null);

    useEffect(() => {

        const fetchPortfolio = async () => {

    try {

        const [summaryResponse, aiResponse] = await Promise.all([

            api.get("/portfolio/summary"),

            api.get("/portfolio/ai-analysis")

        ]);

        setSummary(summaryResponse.data.data.summary);

        setHoldings(summaryResponse.data.data.holdings);

        setPortfolioAnalysis(
            aiResponse.data.data.analysis
        );

    } catch (error) {

        console.error("Failed to load portfolio:", error);

    } finally {

        setLoading(false);

    }

};

        fetchPortfolio();

    }, []);

    if (loading) {

        return (

            <AppLayout>

                <PortfolioSkeleton />

            </AppLayout>

        );

    }

    return (

        <AppLayout>

            <div className="space-y-8">

                {/* Header */}

                <div>

                    <h1 className="text-4xl font-black text-white">

                        💼 Portfolio

                    </h1>

                    <p className="mt-2 text-slate-400">

                        Monitor your investments, portfolio allocation,
                        and overall performance.

                    </p>

                </div>

                {/* Stats */}

                <PortfolioStats

                    summary={summary}

                    holdings={holdings}

                />

                {/* Portfolio */}

                {

                    holdings.length === 0 ? (

                        <EmptyPortfolio />

                    ) : (

                        <>

                            <PortfolioSummary

                                summary={summary}

                                holdings={holdings}

                            />

                            <HoldingsTable

                                holdings={holdings}

                            />
                            {portfolioAnalysis && (

    <PortfolioAIInsights

        analysis={portfolioAnalysis}

    />

)}

                        </>

                    )

                }

            </div>

        </AppLayout>

    );

}