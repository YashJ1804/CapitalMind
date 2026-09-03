import { useState } from "react";
import api from "../../../services/api";

function IndianCompanySearch({ onSelect }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const searchCompany = async () => {
        if (!query.trim()) {
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                `/indian-company/search?q=${encodeURIComponent(query)}`
            );

            setResults(response.data.data || []);
        } catch (error) {
            console.error(
                "Indian company search failed:",
                error
            );

            setError(
                "Unable to search Indian companies."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5 md:p-6">

            {/* Header */}

            <h2 className="break-words text-xl font-bold text-white sm:text-2xl">
                🇮🇳 Analyze Indian Company
            </h2>

            <p className="mt-2 break-words text-sm leading-5 text-slate-500 sm:text-base">
                Search an Indian company using Yahoo Finance.
            </p>

            {/* Search */}

            <div className="mt-5 flex w-full min-w-0 flex-col gap-3 sm:flex-row">

                <input
                    type="text"
                    value={query}
                    onChange={(e) =>
                        setQuery(e.target.value)
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            searchCompany();
                        }
                    }}
                    placeholder="Search TCS, Reliance, Infosys..."
                    className="min-w-0 w-full flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 sm:text-base"
                />

                <button
                    type="button"
                    onClick={searchCompany}
                    disabled={loading}
                    className="w-full shrink-0 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                    {loading ? "Searching..." : "Search"}
                </button>

            </div>

            {/* Error */}

            {error && (
                <p className="mt-4 break-words text-sm text-red-400">
                    {error}
                </p>
            )}

            {/* Results */}

            {results.length > 0 && (
                <div className="mt-5 space-y-3">

                    {results.map((company, index) => (
                        <button
                            key={`${company.symbol}-${index}`}
                            type="button"
                            onClick={() =>
                                onSelect(company)
                            }
                            className="w-full min-w-0 rounded-xl border border-slate-800 bg-slate-950 p-3 text-left transition hover:border-blue-500 hover:bg-slate-800 sm:p-4"
                        >

                            <div className="flex min-w-0 items-center justify-between gap-3">

                                <div className="min-w-0">
                                    <p className="truncate font-bold text-white">
                                        {company.symbol}
                                    </p>

                                    <p className="mt-1 truncate text-sm text-slate-400">
                                        {company.name}
                                    </p>
                                </div>

                                <span className="shrink-0 rounded-lg bg-slate-800 px-2 py-1 text-[10px] text-slate-400 sm:px-3 sm:text-xs">
                                    {company.exchange || "—"}
                                </span>

                            </div>

                        </button>
                    ))}

                </div>
            )}

        </div>
    );
}

export default IndianCompanySearch;