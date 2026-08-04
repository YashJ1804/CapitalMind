import CountUp from "react-countup";

const stats = [

    {
        title: "Companies",
        value: 1000,
        suffix: "+"
    },

    {
        title: "AI Confidence",
        value: 95,
        suffix: "%"
    },

    {
        title: "Analyses",
        value: 10000,
        suffix: "+"
    },

    {
        title: "Availability",
        value: 24,
        suffix: "/7"
    }

];

function StatsSection() {

    return (

        <section className="py-20">

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

                {

                    stats.map((item) => (

                        <div
                            key={item.title}
                            className="rounded-3xl bg-slate-900 border border-slate-800 p-8 text-center hover:border-cyan-500 transition"
                        >

                            <h2 className="text-5xl font-black text-cyan-400">

                                {item.value}
{item.suffix}

                            </h2>

                            <p className="mt-4 text-slate-400">

                                {item.title}

                            </p>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default StatsSection;