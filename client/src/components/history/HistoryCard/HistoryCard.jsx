import { useNavigate } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";

function HistoryCard({ item }) {

    const navigate = useNavigate();

    const score = Number(item.score) || 0;
    const confidence = Number(item.confidence) || 0;

    const getRecommendationStyle = () => {

        const recommendation =
            item.recommendation?.toUpperCase();

        if (recommendation === "BUY") {
            return {
                text: "BUY",
                className:
                    "bg-green-500/15 text-green-400 border-green-500/30"
            };
        }

        if (recommendation === "HOLD") {
            return {
                text: "HOLD",
                className:
                    "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
            };
        }

        if (recommendation === "PASS") {
            return {
                text: "PASS",
                className:
                    "bg-red-500/15 text-red-400 border-red-500/30"
            };
        }

        return {
            text: item.recommendation || "N/A",
            className:
                "bg-slate-500/15 text-slate-300 border-slate-500/30"
        };

    };

    const recommendation =
        getRecommendationStyle();

    const handleViewAnalysis = () => {

    navigate(
        `/history/${item._id}`
    );

};

    return (

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl transition hover:border-slate-700">

            {/* Main Content */}

            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                {/* Company */}

                <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                        <h2 className="text-2xl font-bold text-white">
                            {item.company}
                        </h2>

                        <span
                            className={`rounded-full border px-3 py-1 text-xs font-bold tracking-wide ${recommendation.className}`}
                        >
                            {recommendation.text}
                        </span>

                    </div>

                    <p className="mt-4 max-w-3xl leading-7 text-slate-400">
                        {item.summary}
                    </p>

                </div>


                {/* Score / Confidence */}

                <div className="w-full lg:w-64">

                    {/* Score */}

                    <div className="flex items-center justify-between">

                        <span className="text-sm text-slate-400">
                            Investment Score
                        </span>

                        <span className="font-bold text-white">
                            {score}/100
                        </span>

                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">

                        <div
                            className="h-full rounded-full bg-blue-500 transition-all"
                            style={{
                                width: `${Math.min(
                                    Math.max(score, 0),
                                    100
                                )}%`
                            }}
                        />

                    </div>


                    {/* Confidence */}

                    <div className="mt-5 flex items-center justify-between">

                        <span className="text-sm text-slate-400">
                            AI Confidence
                        </span>

                        <span className="font-bold text-white">
                            {confidence}%
                        </span>

                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">

                        <div
                            className="h-full rounded-full bg-cyan-500 transition-all"
                            style={{
                                width: `${Math.min(
                                    Math.max(confidence, 0),
                                    100
                                )}%`
                            }}
                        />

                    </div>

                </div>

            </div>


            {/* Footer */}

            <div className="mt-6 flex flex-col gap-4 border-t border-slate-800 pt-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-2 text-sm text-slate-500">

                    <CalendarDays size={16} />

                    <span>
                        {new Date(
                            item.createdAt
                        ).toLocaleString()}
                    </span>

                </div>


                {/* View Analysis */}

                <button
                    onClick={handleViewAnalysis}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >

                    View Analysis

                    <ArrowRight size={17} />

                </button>

            </div>

        </div>

    );

}

export default HistoryCard;