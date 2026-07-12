import SearchBar from "../SearchBar/SearchBar";

function HeroSection({
    company,
    setCompany,
    handleAnalyze,
    loading
}) {
    return (
        <section className="relative text-center py-20">

            {/* Badge */}

            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-semibold">

                🤖 AI Powered Investment Research

            </div>

            {/* Heading */}

            <h1 className="mt-8 text-6xl md:text-7xl lg:text-8xl font-black leading-tight">

                CapitalMind

            </h1>

            <h2 className="mt-6 text-3xl md:text-4xl font-bold text-slate-200">

                Smarter Investing with Artificial Intelligence

            </h2>

            <p className="max-w-3xl mx-auto mt-8 text-slate-400 text-lg leading-8">

                Analyze any publicly traded company using live market data,
                financial fundamentals, AI reasoning,
                news sentiment and intelligent investment recommendations.

            </p>

            <div className="max-w-4xl mx-auto mt-12">

                <SearchBar
                    company={company}
                    setCompany={setCompany}
                    handleAnalyze={handleAnalyze}
                    loading={loading}
                />

            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-12 text-slate-400">

                <span>⚡ AI Powered</span>

                <span>📈 Live Market Data</span>

                <span>📰 Latest News</span>

                <span>📊 Smart Recommendations</span>

            </div>

        </section>
    );
}

export default HeroSection;