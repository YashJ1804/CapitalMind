import api from "../../services/api";
import toast from "react-hot-toast";


function RecommendationCard({ result, profile }) {

    const addToWatchlist = async () => {

        try {

            await api.post("/watchlist", {
                symbol: profile.ticker,
                company: profile.name
            });

            toast.success("Added to Watchlist");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to add to Watchlist"
            );

        }

    };

    const getRecommendationLabel = () => {

        const score = result.score;

        if (score >= 95)
            return {
                text: "🟢 Strong BUY",
                bg: "bg-green-500/15",
                color: "text-green-400"
            };

        if (score >= 85)
            return {
                text: "🟢 BUY",
                bg: "bg-green-500/15",
                color: "text-green-400"
            };

        if (score >= 70)
            return {
                text: "🟡 HOLD",
                bg: "bg-yellow-500/15",
                color: "text-yellow-400"
            };

        if (score >= 50)
            return {
                text: "🟠 Weak HOLD",
                bg: "bg-orange-500/15",
                color: "text-orange-400"
            };

        return {
            text: "🔴 PASS",
            bg: "bg-red-500/15",
            color: "text-red-400"
        };

    };

    const getConfidenceLabel = () => {

        if (result.confidence >= 90) return "Very High";
        if (result.confidence >= 75) return "High";
        if (result.confidence >= 60) return "Moderate";

        return "Low";

    };

    const getScoreLabel = () => {

        const score = result.score;

        if (score >= 90) return "Excellent";
        if (score >= 80) return "Very Good";
        if (score >= 70) return "Good";
        if (score >= 60) return "Average";

        return "Poor";

    };

    const recommendation = getRecommendationLabel();

    return (

        <div className="rounded-3xl border border-slate-800 bg-slate-900 shadow-xl p-6 lg:p-8">

            {/* Header */}

            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

                <div className="flex items-center gap-5">

                    <img
                        src={profile.logo}
                        alt={profile.name}
                        className="w-16 h-16 rounded-2xl bg-white p-2 shadow-md"
                    />

                    <div>

                        <h2 className="text-3xl lg:text-4xl font-black text-white">

                            {profile.name}

                        </h2>

                        <p className="text-slate-400 mt-1">

                            {profile.ticker}

                        </p>

                    </div>

                </div>

                <button

                    onClick={addToWatchlist}

                    className="px-6 py-3 rounded-xl bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition-all hover:scale-105"

                >

                    ⭐ Add to Watchlist

                </button>

            </div>

            {/* Divider */}

            <div className="my-8 border-t border-slate-800" />

            {/* Metrics */}

            <div className="grid md:grid-cols-3 gap-6">

                {/* Recommendation */}

                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">

                    <p className="uppercase text-xs tracking-widest text-slate-500">

                        Recommendation

                    </p>

                    <div

                        className={`inline-block mt-5 px-5 py-3 rounded-full text-lg font-bold ${recommendation.bg} ${recommendation.color}`}

                    >

                        {recommendation.text}

                    </div>

                </div>

                {/* Score */}

                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">

                    <p className="uppercase text-xs tracking-widest text-slate-500">

                        Investment Score

                    </p>

                    <h2 className="text-4xl font-black mt-3">

                        {result.score}

                    </h2>

                    <p className="text-slate-400 mt-2">

                        {getScoreLabel()}

                    </p>

                    <div className="mt-5 h-3 bg-slate-800 rounded-full overflow-hidden">

                        <div

                            className="h-full bg-green-500 rounded-full transition-all duration-1000"

                            style={{

                                width: `${result.score}%`

                            }}

                        />

                    </div>

                </div>

                {/* Confidence */}

                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">

                    <p className="uppercase text-xs tracking-widest text-slate-500">

                        AI Confidence

                    </p>

                    <h2 className="text-4xl font-black mt-3">

                        {result.confidence}

                    </h2>

                    <p className="text-slate-400 mt-2">

                        {getConfidenceLabel()} Confidence

                    </p>

                    <div className="mt-5 h-3 bg-slate-800 rounded-full overflow-hidden">

                        <div

                            className="h-full bg-blue-500 rounded-full transition-all duration-1000"

                            style={{

                                width: `${result.confidence}%`

                            }}

                        />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default RecommendationCard;