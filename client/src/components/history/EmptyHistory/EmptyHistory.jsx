import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function EmptyHistory() {

    const navigate = useNavigate();

    return (

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-12 shadow-xl">

            <div className="flex flex-col items-center text-center">

                <div className="text-7xl">
                    📜
                </div>

                <h2 className="mt-6 text-3xl font-black text-white">
                    No Analysis Yet
                </h2>

                <p className="mt-4 max-w-xl text-lg leading-8 text-slate-400">
                    Start analyzing companies to build your investment
                    history and keep track of your previous AI insights.
                </p>

                <button
                    onClick={() => navigate("/analyze")}
                    className="mt-8 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                    <Search size={18} />

                    Analyze a Company
                </button>

            </div>

        </div>

    );
}

export default EmptyHistory;