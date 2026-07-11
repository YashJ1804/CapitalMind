function SearchBar({

    company,

    setCompany,

    handleAnalyze,

    loading

}) {

    return (

        <div className="flex flex-col sm:flex-row gap-4 w-full">

            <input

                type="text"

                className="w-full flex-1 bg-slate-900 border border-slate-700 rounded-xl p-3 sm:p-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm sm:text-base"

                placeholder="Search Apple, NVIDIA, Tesla..."

                value={company}

                disabled={loading}

                onChange={(e) => setCompany(e.target.value)}

                onKeyDown={(e) => {

                    if (e.key === "Enter" && !loading) {

                        handleAnalyze();

                    }

                }}

            />

            <button

                onClick={handleAnalyze}

                disabled={loading || !company.trim()}

                className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200
                    ${loading || !company.trim()
                        ? "bg-slate-700 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}

            >

                {loading ? "Analyzing..." : "Analyze"}

            </button>

        </div>

    );

}

export default SearchBar;