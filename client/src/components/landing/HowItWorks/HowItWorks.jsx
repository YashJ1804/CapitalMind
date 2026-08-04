const steps = [

    {

        number: "01",

        title: "Search Company",

        desc: "Enter any publicly traded company like Apple, NVIDIA or Tesla."

    },

    {

        number: "02",

        title: "AI Analysis",

        desc: "CapitalMind evaluates market data, company fundamentals and latest news."

    },

    {

        number: "03",

        title: "Investment Decision",

        desc: "Receive an AI-powered recommendation with confidence score and reasoning."

    }

];

function HowItWorks() {

    return (

        <section className="py-24">

            <div className="text-center">

                <p className="uppercase tracking-widest text-cyan-400 font-semibold">

                    Process

                </p>

                <h2 className="text-5xl font-black mt-3">

                    How CapitalMind Works

                </h2>

            </div>

            <div className="grid lg:grid-cols-3 gap-10 mt-16">

                {

                    steps.map((step) => (

                        <div

                            key={step.number}

                            className="
relative
rounded-3xl
bg-slate-900
border
border-slate-800
p-10
hover:border-cyan-500
transition-all
"

                        >

                            <div className="
w-16
h-16
rounded-full
bg-gradient-to-r
from-blue-600
to-cyan-500
flex
items-center
justify-center
text-2xl
font-black
">

                                {step.number}

                            </div>

                            <h3 className="text-3xl font-bold mt-8">

                                {step.title}

                            </h3>

                            <p className="text-slate-400 mt-6 leading-8">

                                {step.desc}

                            </p>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default HowItWorks;