import { FaSearch } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";

function SearchBar({

    company,

    setCompany,

    handleAnalyze,

    loading

}) {

    return (

        <div
            className="
            rounded-3xl
            bg-slate-900/80
            backdrop-blur-xl
            border
            border-slate-800
            shadow-2xl
            p-3
            "
        >

            <div className="flex flex-col lg:flex-row gap-4">

                {/* Search Input */}

                <div className="relative flex-1">

                    <FaSearch
                        className="
                        absolute
                        left-5
                        top-1/2
                        -translate-y-1/2
                        text-slate-500
                        "
                    />

                    <input

                        type="text"

                        placeholder="Search Apple, NVIDIA, Tesla, Microsoft..."

                        value={company}

                        disabled={loading}

                        onChange={(e) =>

                            setCompany(e.target.value)

                        }

                        onKeyDown={(e) => {

                            if (

                                e.key === "Enter" &&

                                !loading

                            ) {

                                handleAnalyze();

                            }

                        }}

                        className="
                        w-full
                        pl-14
                        pr-5
                        py-5
                        rounded-2xl
                        bg-slate-950
                        border
                        border-slate-700
                        text-white
                        text-lg
                        placeholder:text-slate-500
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        focus:border-blue-500
                        transition-all
                        duration-300
                        "

                    />

                </div>

                {/* Analyze Button */}

                <button

                    onClick={handleAnalyze}

                    disabled={

                        loading ||

                        !company.trim()

                    }

                    className={`

                    flex

                    items-center

                    justify-center

                    gap-3

                    px-8

                    py-5

                    rounded-2xl

                    font-bold

                    text-lg

                    transition-all

                    duration-300

                    shadow-xl

                    ${

                        loading ||

                        !company.trim()

                            ?

                            "bg-slate-700 text-slate-400 cursor-not-allowed"

                            :

                            "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 hover:scale-105"

                    }

                    `}

                >

                    <FaWandMagicSparkles className="text-xl" />

                    {

                        loading

                            ?

                            "Analyzing..."

                            :

                            "Analyze"

                    }

                </button>

            </div>

            {/* Hint */}

            <p className="text-sm text-slate-500 mt-4 px-2">

                💡 Try searching:

                <span className="text-slate-300">

                    {" "}Apple, Microsoft, NVIDIA, Amazon, Tesla

                </span>

            </p>

        </div>

    );

}

export default SearchBar;