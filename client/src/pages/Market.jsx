import { useEffect, useState } from "react";

import AppLayout from "../layouts/AppLayout";
import IndexChart from "../components/market/IndexChart/IndexChart";
import Trend
    from "../components/market/Trend/Trend";
    import IndianCompanySearch
    from "../components/market/IndianCompany/IndianCompanySearch";
import api from "../services/api";
import IndianCompanyAnalysis
    from "../components/market/IndianCompany/IndianCompanyAnalysis";

export default function Market() {

    const [market, setMarket] = useState("INDIA");
    const [usMarketStatus, setUSMarketStatus] = useState(null);

    const [selectedIndianCompany, setSelectedIndianCompany] =
    useState(null);

    const [marketData, setMarketData] = useState(null);
    const [usMarketData, setUSMarketData] = useState(null);
const [usLoading, setUSLoading] = useState(false);
const [usError, setUSError] = useState("");

    const [loading, setLoading] = useState(true);

    const [marketStatus, setMarketStatus] = useState(null);

    const [error, setError] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(null);

const [history, setHistory] = useState([]);

const [historyLoading, setHistoryLoading] = useState(false);

const [selectedRange, setSelectedRange] = useState("1mo");

const fetchHistory = async (
    index,
    range = selectedRange
) => {

    try {

        setHistoryLoading(true);

        setSelectedIndex(index);

        const endpoint =
            market === "INDIA"
                ? "/market/india/history"
                : "/market/usa/history";

        const response = await api.get(
            endpoint,
            {
                params: {
                    symbol: index.symbol,
                    range,
                    interval:
                        range === "1d"
                            ? "5m"
                            : "1d"
                }
            }
        );

        setHistory(
            response.data.data.history
        );

    } catch (error) {

        console.error(
            "Failed to load historical data:",
            error
        );

        setHistory([]);

    } finally {

        setHistoryLoading(false);

    }

};

const fetchMarketStatus = async () => {

    try {

        const response = await api.get(
            "/market/india/status"
        );

        setMarketStatus(
            response.data.data
        );

    } catch (error) {

        console.error(
            "Failed to load market status:",
            error
        );

    }

};

const fetchUSMarketStatus = async () => {

    try {

        const response = await api.get(
            "/market/usa/status"
        );

        setUSMarketStatus(
            response.data.data
        );

    } catch (error) {

        console.error(
            "Failed to load US market status:",
            error
        );

    }

};

    useEffect(() => {

    const fetchIndianMarket = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await api.get(
                "/market/india"
            );

            setMarketData(
                response.data.data
            );

        } catch (error) {

            console.error(
                "Failed to load Indian market:",
                error
            );

            setError(
                "Unable to load Indian market data."
            );

        } finally {

            setLoading(false);

        }

    };
    const fetchUSMarket = async () => {

    try {

        setUSLoading(true);

        setUSError("");

        const response = await api.get(
            "/market/usa"
        );

        setUSMarketData(
            response.data.data
        );

    } catch (error) {

        console.error(
            "Failed to load US market:",
            error
        );

        setUSError(
            "Unable to load US market data."
        );

    } finally {

        setUSLoading(false);

    }

};


    const refreshIndianMarket = async () => {

        try {

            const response = await api.get(
                "/market/india"
            );

            setMarketData(
                response.data.data
            );

        } catch (error) {

            console.error(
                "Failed to refresh Indian market:",
                error
            );

        }

    };


     if (market === "INDIA") {

        fetchIndianMarket();

        fetchMarketStatus();

    }


    if (market === "USA") {

        fetchUSMarket();

        fetchUSMarketStatus();

    }



    const interval = setInterval(() => {

        if (market === "INDIA") {

            refreshIndianMarket();

            fetchMarketStatus();

        }
         if (market === "USA") {

            fetchUSMarket();

            fetchUSMarketStatus();

        }
        

    }, 30000);


    return () => {

        clearInterval(interval);

    };

}, [market]);

    const formatNumber = (value) => {

        return Number(value).toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

    };

    const getChangeColor = (change) => {

        return change >= 0
            ? "text-green-400"
            : "text-red-400";

    };

    const getChangeIcon = (change) => {

        return change >= 0
            ? "▲"
            : "▼";

    };

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (

            <AppLayout>

                <div className="space-y-8">

                    <div>

                        <div className="h-10 w-72 animate-pulse rounded-lg bg-slate-800" />

                        <div className="mt-3 h-5 w-96 animate-pulse rounded bg-slate-800" />

                    </div>

                    <div className="grid gap-6 md:grid-cols-3">

                        {[1, 2, 3].map((item) => (

                            <div
                                key={item}
                                className="h-44 animate-pulse rounded-3xl bg-slate-900"
                            />

                        ))}

                    </div>

                </div>

            </AppLayout>

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    if (error) {

        return (

            <AppLayout>

                <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center">

                    <div className="text-5xl">
                        ⚠️
                    </div>

                    <h2 className="mt-4 text-2xl font-bold text-white">
                        Market Data Unavailable
                    </h2>

                    <p className="mt-2 text-red-300">
                        {error}
                    </p>

                </div>

            </AppLayout>

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Indian Market Data
    |--------------------------------------------------------------------------
    */

    const {
        nifty50,
        sensex,
        bankNifty
    } = marketData?.indices || {};

    const indices = [
        nifty50,
        sensex,
        bankNifty
    ].filter(Boolean);

    /*
    |--------------------------------------------------------------------------
    | UI
    |--------------------------------------------------------------------------
    */

    return (

        <AppLayout>

            <div className="space-y-8">

                {/* =========================================================
                    Header
                ========================================================= */}

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    {/* Title */}

                    <div>

                        <div className="flex items-center gap-3">

                            <span className="text-4xl">
                                {market === "INDIA"
                                    ? "🇮🇳"
                                    : "🇺🇸"}
                            </span>

                            <div>

                                <h1 className="text-4xl font-black text-white">

                                    {market === "INDIA"
                                        ? "Indian Market"
                                        : "US Market"}

                                </h1>

                                <p className="mt-2 text-slate-400">

                                    {market === "INDIA"
                                        ? "Live overview of major Indian market indices."
                                        : "Live overview of major USA market indices."}

                                </p>

                            </div>

                        </div>

                    </div>

                    {/* =====================================================
                        Market Selector
                    ===================================================== */}

                    <div className="flex rounded-xl border border-slate-700 bg-slate-900 p-1">

                        <button
    onClick={() => {
        setMarket("INDIA");
        setSelectedIndex(null);
        setHistory([]);
    }}
    className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
        market === "INDIA"
            ? "bg-blue-600 text-white shadow-lg"
            : "text-slate-400 hover:text-white"
    }`}
>
    🇮🇳 India
</button>

                        <button
    onClick={() => {
        setMarket("USA");
        setSelectedIndex(null);
        setHistory([]);
    }}
    className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
        market === "USA"
            ? "bg-blue-600 text-white shadow-lg"
            : "text-slate-400 hover:text-white"
    }`}
>
    🇺🇸 USA
</button>

                    </div>

                </div>


                {/* =========================================================
                    INDIA MARKET
                ========================================================= */}

                {market === "INDIA" && (

                    <>

                        {/* Market Status */}

                        {marketStatus && (

    <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4">

        <span
            className={`h-3 w-3 rounded-full ${
                marketStatus.isOpen
                    ? "bg-green-400 shadow-lg shadow-green-400/30"
                    : "bg-red-400 shadow-lg shadow-red-400/30"
            }`}
        />

        <div>

            <p className="font-semibold text-white">

                {marketStatus.isOpen
                    ? "Market Open"
                    : "Market Closed"}

            </p>

            <p className="text-sm text-slate-500">

                NSE • Trading hours{" "}
                {marketStatus.tradingHours.open}
                {" - "}
                {marketStatus.tradingHours.close}
                {" IST"}

            </p>

        </div>

    </div>

)}


                        {/* =================================================
                            Index Cards
                        ================================================= */}

                        <div className="grid gap-6 md:grid-cols-3">

                            {indices.map((index) => (

                                <div
                                    key={index.symbol}
                                    onClick={() => fetchHistory(index)}
                                    className="rounded-3xl border border-slate-800 bg-slate-900 p-7 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-slate-700"
                                >

                                    {/* Card Header */}

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <p className="text-sm font-medium text-slate-500">
                                                MARKET INDEX
                                            </p>

                                            <h2 className="mt-2 text-xl font-bold text-white">
                                                {index.name}
                                            </h2>

                                        </div>

                                        <div className="rounded-xl bg-slate-950 px-3 py-2 text-lg">
                                            📊
                                        </div>

                                    </div>


                                    {/* Price */}

                                    <div className="mt-7">

                                        <p className="text-3xl font-black text-white">

                                            {formatNumber(
                                                index.price
                                            )}

                                        </p>


                                        {/* Change */}

                                        <div className="mt-3 flex items-center gap-2">

                                            <span
                                                className={`font-semibold ${getChangeColor(
                                                    index.change
                                                )}`}
                                            >

                                                {getChangeIcon(
                                                    index.change
                                                )}

                                                {" "}

                                                {formatNumber(
                                                    Math.abs(
                                                        index.change
                                                    )
                                                )}

                                            </span>


                                            <span
                                                className={`font-semibold ${getChangeColor(
                                                    index.changePercent
                                                )}`}
                                            >

                                                {index.changePercent >= 0
                                                    ? "+"
                                                    : ""}

                                                {index.changePercent.toFixed(
                                                    2
                                                )}

                                                %

                                            </span>

                                        </div>

                                    </div>


                                    {/* Previous Close */}

                                    <div className="mt-6 border-t border-slate-800 pt-4">

                                        <div className="flex justify-between text-sm">

                                            <span className="text-slate-500">
                                                Previous Close
                                            </span>

                                            <span className="font-medium text-slate-300">

                                                {formatNumber(
                                                    index.previousClose
                                                )}

                                            </span>

                                        </div>

                                    </div>

                                </div>
                                

                            ))}

                        </div>
                        

                    </>

                )}

                {usMarketStatus && (

    <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4">

        <span
            className={`h-3 w-3 rounded-full ${
                usMarketStatus.isOpen
                    ? "bg-green-400 shadow-lg shadow-green-400/30"
                    : "bg-red-400 shadow-lg shadow-red-400/30"
            }`}
        />

        <div>

            <p className="font-semibold text-white">

                {usMarketStatus.isOpen
                    ? "Market Open"
                    : "Market Closed"}

            </p>

            <p className="text-sm text-slate-500">

                NYSE / NASDAQ • Trading hours{" "}
                {usMarketStatus.tradingHours.open}
                {" - "}
                {usMarketStatus.tradingHours.close}
                {" ET"}

            </p>

        </div>

    </div>

)}


                {/* =========================================================
                    USA MARKET
                ========================================================= */}

                {market === "USA" && (
                    

    <>

        {usLoading ? (

            <div className="grid gap-6 md:grid-cols-3">

                {[1, 2, 3].map((item) => (

                    <div
                        key={item}
                        className="h-44 animate-pulse rounded-3xl bg-slate-900"
                    />

                ))}

            </div>

        ) : usError ? (

            <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center">

                <div className="text-5xl">
                    ⚠️
                </div>

                <h2 className="mt-4 text-2xl font-bold text-white">
                    US Market Data Unavailable
                </h2>

                <p className="mt-2 text-red-300">
                    {usError}
                </p>

            </div>

        ) : usMarketData ? (

            <div className="grid gap-6 md:grid-cols-3">

                {[
                    usMarketData.indices.sp500,
                    usMarketData.indices.nasdaq,
                    usMarketData.indices.dowJones
                ].map((index) => (

                    <div
                        key={index.symbol}
                        onClick={() => fetchHistory(index)}
                        className="rounded-3xl border border-slate-800 bg-slate-900 p-7 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-slate-700"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm font-medium text-slate-500">
                                    MARKET INDEX
                                </p>

                                <h2 className="mt-2 text-xl font-bold text-white">
                                    {index.name}
                                </h2>

                            </div>

                            <div className="rounded-xl bg-slate-950 px-3 py-2 text-lg">
                                📊
                            </div>

                        </div>

                        <div className="mt-7">

                            <p className="text-3xl font-black text-white">
                                {Number(index.price).toLocaleString(
                                    "en-US",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    }
                                )}
                            </p>

                            <div className="mt-3 flex items-center gap-2">

                                <span
                                    className={`font-semibold ${
                                        index.change >= 0
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >

                                    {index.change >= 0
                                        ? "▲"
                                        : "▼"}

                                    {" "}

                                    {Math.abs(
                                        index.change
                                    ).toFixed(2)}

                                </span>

                                <span
                                    className={`font-semibold ${
                                        index.changePercent >= 0
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >

                                    {index.changePercent >= 0
                                        ? "+"
                                        : ""}

                                    {index.changePercent.toFixed(2)}%

                                </span>

                            </div>

                        </div>

                        <div className="mt-6 border-t border-slate-800 pt-4">

                            <div className="flex justify-between text-sm">

                                <span className="text-slate-500">
                                    Previous Close
                                </span>

                                <span className="font-medium text-slate-300">

                                    {Number(
                                        index.previousClose
                                    ).toLocaleString(
                                        "en-US",
                                        {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        }
                                    )}

                                </span>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        ) : null}

    </>

)}

{/* MARKET TREND */}
{market === "INDIA" && marketData?.snapshot && (
    <Trend
        snapshot={marketData.snapshot}
    />
)}

{market === "USA" && usMarketData?.snapshot && (
    <Trend
        snapshot={usMarketData.snapshot}
    />
)}

{/* INDIAN COMPANY ANALYSIS */}

{market === "INDIA" && (
    <>
        <IndianCompanySearch
            onSelect={(company) => {
                setSelectedIndianCompany(company);
            }}
        />

        <IndianCompanyAnalysis
            company={selectedIndianCompany}
        />
    </>
)}

{selectedIndex && (

    <div className="space-y-6">

        {/* Range Selector */}

        <div className="flex flex-wrap gap-2">

            {[
                ["1d", "1D"],
                ["5d", "1W"],
                ["1mo", "1M"],
                ["6mo", "6M"],
                ["1y", "1Y"]
            ].map(([value, label]) => (

                <button
                    key={value}
                    onClick={() => {
                        setSelectedRange(value);
                        fetchHistory(
                            selectedIndex,
                            value
                        );
                    }}
                    className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${
                        selectedRange === value
                            ? "bg-blue-600 text-white"
                            : "bg-slate-900 text-slate-400 hover:text-white"
                    }`}
                >
                    {label}
                </button>

            ))}

        </div>

        {/* Loading */}

        

        {historyLoading ? (

            <div className="h-[400px] animate-pulse rounded-3xl bg-slate-900" />

        ) : history.length > 0 ? (

            <IndexChart
                data={history}
                indexName={selectedIndex.name}
                range={selectedRange}
            />

        ) : (

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
                No historical data available.
            </div>

        )}


    </div>

)}

            </div>

        </AppLayout>

    );

}