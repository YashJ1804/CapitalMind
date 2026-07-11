import api from "../../services/api";
import toast from "react-hot-toast";
import CountUp from "react-countup";

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

        if (score >= 95) {

            return {

                text: "🟢 Strong BUY",
                bg: "bg-green-600/20",
                color: "text-green-400"

            };

        }

        if (score >= 85) {

            return {

                text: "🟢 BUY",
                bg: "bg-green-500/20",
                color: "text-green-400"

            };

        }

        if (score >= 70) {

            return {

                text: "🟡 HOLD",
                bg: "bg-yellow-500/20",
                color: "text-yellow-400"

            };

        }

        if (score >= 50) {

            return {

                text: "🟠 Weak HOLD",
                bg: "bg-orange-500/20",
                color: "text-orange-400"

            };

        }

        return {

            text: "🔴 PASS",
            bg: "bg-red-500/20",
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

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">

            {/* Company */}

           <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">

                    <img

                        src={profile.logo}

                        alt={profile.name}

                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white p-2"

                    />

                    <div>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">

                            {profile.name}

                        </h2>

                        <p className="text-slate-400">

                            {profile.ticker}

                        </p>

                    </div>

                </div>

                <button

                    onClick={addToWatchlist}

                    className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-3 rounded-xl transition"

                >

                    ⭐ Add to Watchlist

                </button>

            </div>

            {/* Recommendation */}

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Recommendation */}

                <div>

                    <p className="text-slate-400 text-sm uppercase tracking-wide">

                        Recommendation

                    </p>

                    <div

                        className={`inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-full text-base sm:text-lg lg:text-xl font-bold mt-3 ${recommendation.bg} ${recommendation.color}`}

                    >

                        {recommendation.text}

                    </div>

                </div>

                {/* Investment Score */}

                <div>

                    <p className="text-slate-400 text-sm uppercase tracking-wide">

                        Investment Score

                    </p>

                    <h2 className="mt-2 text-2xl sm:text-3xl font-bold">

                        <CountUp

    end={result.score}

    duration={2}

    suffix="/100"

/>

                    </h2>

                    <p className="text-slate-400 mt-1">

                        {getScoreLabel()}

                    </p>

                    <div className="w-full h-2 sm:h-3 bg-slate-700 rounded-full mt-4">

                        <div

                            className="h-3 rounded-full bg-green-500 transition-all duration-700"

                            style={{

                                width: `${result.score}%`

                            }}

                        />

                    </div>

                </div>

                {/* Confidence */}

                <div>

                    <p className="text-slate-400 text-sm uppercase tracking-wide">

                        AI Confidence

                    </p>

                    <h2 className="mt-2 text-3xl font-bold">

                        <CountUp

    end={result.confidence}

    duration={2}

    suffix="%"

/>

                    </h2>

                    <p className="text-slate-400 mt-1">

                        {getConfidenceLabel()} Confidence

                    </p>

                    <div className="w-full h-3 bg-slate-700 rounded-full mt-4">

                        <div

                            className="h-3 rounded-full bg-blue-500 transition-all duration-700"

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