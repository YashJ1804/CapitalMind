import { useEffect, useState } from "react";
import api from "../../../services/api";

function IndianCompanyAnalysis({ company }) {

    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {

        if (!company?.symbol) {
            return;
        }


        const fetchAnalysis = async () => {

            try {

                setLoading(true);
                setError("");
                setAnalysis(null);


                // ==========================================
                // Indian Market Analysis
                // ==========================================

                const response = await api.post(
                    "/analyze",
                    {
                        company: company.symbol,
                        market: "INDIA"
                    }
                );


                setAnalysis(
                    response.data.data
                );


            } catch (error) {

                console.error(
                    "Indian company analysis failed:",
                    error
                );


                setError(
                    error.response?.data?.message ||
                    "Unable to analyze this company."
                );


            } finally {

                setLoading(false);

            }

        };


        fetchAnalysis();

    }, [company]);


    // ==========================================
    // No company selected
    // ==========================================

    if (!company) {
        return null;
    }


    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return (

            <div className="mt-6 rounded-2xl bg-slate-900 p-6 text-center">

                <p className="text-slate-400">

                    🤖 Analyzing{" "}

                    {company.symbol
                        ?.replace(".NS", "")
                        .replace(".BO", "")}

                    ...

                </p>

            </div>

        );

    }


    // ==========================================
    // Error
    // ==========================================

    if (error) {

        return (

            <div className="mt-6 rounded-2xl bg-slate-900 p-6">

                <p className="text-red-400">

                    {error}

                </p>

            </div>

        );

    }


    // ==========================================
    // No analysis
    // ==========================================

    if (!analysis) {
        return null;
    }


    // ==========================================
    // Backend response
    // ==========================================

    const quote =
        analysis.quote || {};


    const profile =
        analysis.profile || {};


    const ai =
        analysis.analysis || {};


    // ==========================================
    // Render
    // ==========================================

    return (

        <div className="mt-6 space-y-6">


            {/* =====================================
                COMPANY OVERVIEW
            ====================================== */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <p className="text-sm text-slate-500">

                    🇮🇳 INDIAN COMPANY

                </p>


                <h2 className="mt-1 text-3xl font-bold text-white">

                    {company.name ||
                        profile.name ||
                        company.symbol}

                </h2>


                <p className="mt-1 text-slate-400">

                    {company.symbol
                        ?.replace(".NS", "")
                        .replace(".BO", "")}

                </p>


                <div className="mt-5 flex flex-wrap gap-6">


                    {/* PRICE */}

                    <div>

                        <p className="text-sm text-slate-500">

                            PRICE

                        </p>


                        <p className="text-2xl font-bold text-white">

                            ₹

                            {quote.currentPrice !== undefined &&
                            quote.currentPrice !== null

                                ? Number(
                                    quote.currentPrice
                                ).toFixed(2)

                                : "--"}

                        </p>

                    </div>


                    {/* CHANGE */}

                    <div>

                        <p className="text-sm text-slate-500">

                            CHANGE

                        </p>


                        <p
                            className={`text-2xl font-bold ${
                                Number(
                                    quote.change || 0
                                ) >= 0

                                    ? "text-green-400"

                                    : "text-red-400"
                            }`}
                        >

                            {Number(
                                quote.percentChange || 0
                            ) >= 0

                                ? "+"

                                : ""}


                            {quote.percentChange !== undefined &&
                            quote.percentChange !== null

                                ? Number(
                                    quote.percentChange
                                ).toFixed(2)

                                : "0.00"}

                            %

                        </p>

                    </div>


                    {/* EXCHANGE */}

                    <div>

                        <p className="text-sm text-slate-500">

                            EXCHANGE

                        </p>


                        <p className="text-xl font-bold text-white">

                            {profile.exchange || "NSE"}

                        </p>

                    </div>

                </div>

            </div>


            {/* =====================================
                AI RECOMMENDATION
            ====================================== */}

            {ai.recommendation && (

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">


                    <p className="text-sm text-slate-500">

                        AI INVESTMENT ANALYSIS

                    </p>


                    <div className="mt-3 flex flex-wrap items-center gap-4">


                        <h2 className="text-4xl font-black text-white">

                            {ai.recommendation}

                        </h2>


                        {ai.confidence !== undefined && (

                            <span className="rounded-xl bg-slate-800 px-4 py-2 text-slate-300">

                                {ai.confidence}%
                                confidence

                            </span>

                        )}

                    </div>


                    {/* SUMMARY */}

                    {ai.summary && (

                        <p className="mt-4 text-slate-300">

                            {ai.summary}

                        </p>

                    )}


                    {/* =================================
                        BULL CASE
                    ================================== */}

                    {ai.bullCase?.length > 0 && (

                        <div className="mt-6">

                            <h3 className="font-bold text-green-400">

                                Bull Case

                            </h3>


                            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-400">

                                {ai.bullCase.map(
                                    (item, index) => (

                                        <li key={index}>

                                            {item}

                                        </li>

                                    )
                                )}

                            </ul>

                        </div>

                    )}


                    {/* =================================
                        BEAR CASE
                    ================================== */}

                    {ai.bearCase?.length > 0 && (

                        <div className="mt-6">

                            <h3 className="font-bold text-red-400">

                                Bear Case

                            </h3>


                            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-400">

                                {ai.bearCase.map(
                                    (item, index) => (

                                        <li key={index}>

                                            {item}

                                        </li>

                                    )
                                )}

                            </ul>

                        </div>

                    )}


                    {/* =================================
                        RISKS
                    ================================== */}

                    {ai.risks?.length > 0 && (

                        <div className="mt-6">

                            <h3 className="font-bold text-yellow-400">

                                Risks

                            </h3>


                            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-400">

                                {ai.risks.map(
                                    (item, index) => (

                                        <li key={index}>

                                            {item}

                                        </li>

                                    )
                                )}

                            </ul>

                        </div>

                    )}


                    {/* =================================
                        MARKET CONTEXT
                    ================================== */}

                    {ai.marketContext && (

                        <div className="mt-6 rounded-xl bg-slate-950 p-4">

                            <h3 className="font-bold text-white">

                                Market Context

                            </h3>


                            <p className="mt-2 text-slate-400">

                                {ai.marketContext}

                            </p>

                        </div>

                    )}

                </div>

            )}

        </div>

    );

}

export default IndianCompanyAnalysis;