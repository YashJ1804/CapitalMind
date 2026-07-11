import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, Circle } from "lucide-react";

const steps = [
    "Searching company...",
    "Fetching financial data...",
    "Reading latest news...",
    "AI is analyzing...",
    "Building investment report..."
];

function Loader() {

    const [step, setStep] = useState(0);

    useEffect(() => {

        const interval = setInterval(() => {

            setStep((prev) => {

                if (prev >= steps.length - 1) {
                    return prev;
                }

                return prev + 1;

            });

        }, 800);

        return () => clearInterval(interval);

    }, []);

    return (

        <div className="mt-12 w-full max-w-3xl mx-auto">

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">

                <div className="flex items-center gap-3 mb-8">

                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />

                    <h2 className="text-2xl font-bold text-white">

                        AI Research in Progress

                    </h2>

                </div>

                <div className="space-y-5">

                    {steps.map((item, index) => {

                        const completed = index < step;
                        const active = index === step;

                        return (

                            <div
                                key={index}
                                className={`flex items-center gap-4 transition-all duration-500 ${
                                    completed
                                        ? "text-green-400"
                                        : active
                                        ? "text-blue-400"
                                        : "text-slate-500"
                                }`}
                            >

                                {completed ? (
                                    <CheckCircle2 className="w-5 h-5" />
                                ) : active ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Circle className="w-5 h-5" />
                                )}

                                <span className="text-lg">

                                    {item}

                                </span>

                            </div>

                        );

                    })}

                </div>

            </div>

        </div>

    );

}

export default Loader;