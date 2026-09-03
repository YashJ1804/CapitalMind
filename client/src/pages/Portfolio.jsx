import { useEffect, useState } from "react";

import api from "../services/api";
import toast from "react-hot-toast";
import AppLayout from "../layouts/AppLayout";

import PortfolioStats from "../components/portfolio/PortfolioStats/PortfolioStats";
import PortfolioSummary from "../components/portfolio/PortfolioSummary/PortfolioSummary";
import HoldingsTable from "../components/portfolio/HoldingsTable/HoldingsTable";
import EmptyPortfolio from "../components/portfolio/EmptyPortfolio/EmptyPortfolio";
import PortfolioSkeleton from "../components/portfolio/PortfolioSkeleton/PortfolioSkeleton";
import PortfolioAIInsights from "../components/portfolio/PortfolioAIInsights/PortfolioAIInsights";
import AddHoldingModal from "../components/portfolio/AddHoldingModal/AddHoldingModal";
import PortfolioCharts from "../components/portfolio/PortfolioCharts/PortfolioCharts";
import EditHoldingModal from "../components/portfolio/EditHoldingModal/EditHoldingModal";

export default function Portfolio() {

    const [loading, setLoading] = useState(true);

    const [summary, setSummary] = useState(null);

    const [holdings, setHoldings] = useState([]);

    const [portfolioAnalysis, setPortfolioAnalysis] = useState(null);

    const [showAddModal, setShowAddModal] = useState(false);

    const [editingHolding, setEditingHolding] = useState(null);

    const [currency, setCurrency] = useState("USD");

    const [usdToInr, setUsdToInr] = useState(1);

    const [exchangeRateLoading, setExchangeRateLoading] =
        useState(false);


    // ==============================
    // FETCH EXCHANGE RATE
    // ==============================

    const fetchExchangeRate = async () => {

        try {

            setExchangeRateLoading(true);

            const response = await api.get(
                "/currency/usd-inr"
            );

            setUsdToInr(
                response.data.data.rate
            );

        } catch (error) {

            console.error(
                "Failed to load USD/INR exchange rate:",
                error
            );

            // Keep USD working if exchange rate fails.
            setUsdToInr(1);

        } finally {

            setExchangeRateLoading(false);

        }

    };


    // ==============================
    // FETCH PORTFOLIO
    // ==============================

    const fetchPortfolio = async () => {

    try {

        // Clear old AI analysis first.
        // This prevents stale analysis from being displayed
        // after an edit/delete.
        setPortfolioAnalysis(null);

        // ==============================
        // FETCH PORTFOLIO SUMMARY
        // ==============================

        const summaryResponse = await api.get(
            "/portfolio/summary"
        );

        const portfolioData =
            summaryResponse.data.data;

        const newSummary =
            portfolioData.summary;

        const newHoldings =
            portfolioData.holdings || [];

        setSummary(newSummary);
        setHoldings(newHoldings);

        // ==============================
        // EMPTY PORTFOLIO
        // ==============================

        if (newHoldings.length === 0) {

            // No reason to call the AI endpoint
            // when there are no holdings.
            setPortfolioAnalysis(null);

            return;

        }

        // ==============================
        // FETCH AI ANALYSIS
        // ==============================

        try {

            const aiResponse = await api.get(
                "/portfolio/ai-analysis"
            );

            setPortfolioAnalysis(
                aiResponse.data.data.analysis
            );

        } catch (error) {

            console.error(
                "Failed to load portfolio AI analysis:",
                error
            );

            // Portfolio still works even if AI fails.
            setPortfolioAnalysis(null);

        }

    } catch (error) {

        console.error(
            "Failed to load portfolio summary:",
            error
        );

        setSummary(null);
        setHoldings([]);
        setPortfolioAnalysis(null);

    } finally {

        setLoading(false);

    }

};


    // ==============================
    // REMOVE HOLDING
    // ==============================

    const removeHolding = async (holdingId) => {

    try {

        await api.delete(
            `/portfolio/${holdingId}`
        );

        toast.success(
            "Investment removed successfully."
        );

        await fetchPortfolio();

    } catch (error) {

        console.error(
            "Failed to remove holding:",
            error
        );

        toast.error(
            error.response?.data?.message ||
            "Failed to remove investment."
        );

        // Re-throw so the confirmation modal
        // doesn't close when deletion fails.
        throw error;

    }

};


    // ==============================
    // EDIT HOLDING
    // ==============================

    const editHolding = (holding) => {

        setEditingHolding(holding);

    };


    // ==============================
    // INITIAL LOAD
    // ==============================

    useEffect(() => {

        fetchPortfolio();

        fetchExchangeRate();

    }, []);


    // ==============================
    // LOADING SCREEN
    // ==============================

    if (loading) {

        return (

            <AppLayout>

                <PortfolioSkeleton />

            </AppLayout>

        );

    }


    // ==============================
    // PAGE
    // ==============================

    return (

        <AppLayout>

            <div className="space-y-8">

                {/* ==============================
                    HEADER
                ============================== */}

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <h1 className="text-4xl font-black text-white">
                            💼 Portfolio
                        </h1>

                        <p className="mt-2 text-slate-400">
                            Monitor your investments, portfolio allocation,
                            and overall performance.
                        </p>

                    </div>


                    <div className="flex flex-wrap items-center gap-3">

                        {/* ==============================
                            CURRENCY TOGGLE
                        ============================== */}

                        <div className="flex items-center gap-2">

                            <div className="flex rounded-xl border border-slate-700 bg-slate-900 p-1">

                                <button
                                    onClick={() => setCurrency("USD")}
                                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                                        currency === "USD"
                                            ? "bg-blue-600 text-white"
                                            : "text-slate-400 hover:text-white"
                                    }`}
                                >
                                    $ USD
                                </button>


                                <button
                                    onClick={() => setCurrency("INR")}
                                    disabled={exchangeRateLoading}
                                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                                        currency === "INR"
                                            ? "bg-blue-600 text-white"
                                            : "text-slate-400 hover:text-white"
                                    }`}
                                >
                                    ₹ INR
                                </button>

                            </div>


                            {currency === "INR" &&
                                usdToInr > 1 && (

                                    <span className="text-xs text-slate-500">

                                        1 USD ≈ ₹
                                        {usdToInr.toFixed(2)}

                                    </span>

                                )}

                        </div>


                        {/* ==============================
                            ADD INVESTMENT
                        ============================== */}

                        <button
                            onClick={() =>
                                setShowAddModal(true)
                            }
                            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            + Add Investment
                        </button>

                    </div>

                </div>


                {/* ==============================
                    STATS
                ============================== */}

                <PortfolioStats
                    summary={summary}
                    holdings={holdings}
                    currency={currency}
                    usdToInr={usdToInr}
                />


                {/* ==============================
                    PORTFOLIO
                ============================== */}

                {holdings.length === 0 ? (

                    <EmptyPortfolio />

                ) : (

                    <>

                        <PortfolioSummary
                            summary={summary}
                            holdings={holdings}
                            currency={currency}
                            usdToInr={usdToInr}
                        />

                        <PortfolioCharts
    holdings={holdings}
    currency={currency}
    usdToInr={usdToInr}
/>


                        <HoldingsTable
                            holdings={holdings}
                            currency={currency}
                            usdToInr={usdToInr}
                            removeHolding={removeHolding}
                            editHolding={editHolding}
                        />


                        {portfolioAnalysis && (

                            <PortfolioAIInsights
                                analysis={portfolioAnalysis}
                            />

                        )}

                    </>

                )}

            </div>


            {/* ==============================
                ADD HOLDING MODAL
            ============================== */}

            {showAddModal && (

                <AddHoldingModal
                    onClose={() =>
                        setShowAddModal(false)
                    }
                    onSuccess={fetchPortfolio}
                />

            )}


            {/* ==============================
                EDIT HOLDING MODAL
            ============================== */}

            {editingHolding && (

                <EditHoldingModal
                    holding={editingHolding}
                    onClose={() =>
                        setEditingHolding(null)
                    }
                    onSuccess={fetchPortfolio}
                />

            )}

        </AppLayout>

    );

}