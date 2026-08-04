import {
    FaBrain,
    FaChartLine,
    FaNewspaper,
    FaStar
} from "react-icons/fa";

const features = [

    {
        icon: <FaBrain size={34} />,
        title: "AI Investment Analysis",
        desc: "Powered by Gemini AI to generate intelligent BUY, HOLD or PASS recommendations."
    },

    {
        icon: <FaChartLine size={34} />,
        title: "Live Market Data",
        desc: "Real-time prices, company profiles, financial metrics and market movements."
    },

    {
        icon: <FaNewspaper size={34} />,
        title: "News Sentiment",
        desc: "Latest company news combined with AI reasoning to improve investment decisions."
    },

    {
        icon: <FaStar size={34} />,
        title: "Personal Watchlist",
        desc: "Save companies and revisit your favorite investment opportunities anytime."
    }

];

function FeaturesSection() {

    return (

        <section className="py-24">

            <div className="text-center">

                <p className="text-cyan-400 font-semibold tracking-widest uppercase">

                    Features

                </p>

                <h2 className="text-5xl font-black mt-3">

                    Everything You Need

                </h2>

                <p className="text-slate-400 mt-5 max-w-3xl mx-auto">

                    CapitalMind combines AI, financial data and news
                    into one intelligent investment platform.

                </p>

            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-16">

                {

                    features.map((feature) => (

                        <div

                            key={feature.title}

                            className="
rounded-3xl
bg-slate-900
border
border-slate-800
p-8
hover:border-cyan-500
hover:-translate-y-2
transition-all
duration-300
"

                        >

                            <div className="text-cyan-400">

                                {feature.icon}

                            </div>

                            <h3 className="text-2xl font-bold mt-6">

                                {feature.title}

                            </h3>

                            <p className="text-slate-400 mt-5 leading-8">

                                {feature.desc}

                            </p>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default FeaturesSection;