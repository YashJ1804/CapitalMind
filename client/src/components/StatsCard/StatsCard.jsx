import CountUp from "react-countup";

function StatsCard({ title, value, color }) {

    return (

        <div
            className="
            group
            rounded-3xl
            border
            border-slate-800
            bg-slate-900
            p-6
            shadow-lg
            hover:border-blue-500
            hover:-translate-y-1
            hover:shadow-2xl
            transition-all
            duration-300
            "
        >

            <div className="flex items-center justify-between">

                <p
                    className="
                    text-slate-400
                    uppercase
                    tracking-widest
                    text-xs
                    font-medium
                    "
                >

                    {title}

                </p>

                <div
                    className="
                    w-10
                    h-10
                    rounded-xl
                    bg-slate-800
                    flex
                    items-center
                    justify-center
                    text-lg
                    group-hover:bg-blue-500/20
                    transition-all
                    "
                >

                    {title.split(" ")[0]}

                </div>

            </div>

            <h2
                className={`

                mt-6

                text-5xl

                font-black

                ${color}

                `}
            >

                <CountUp

                    end={Number(value) || 0}

                    duration={1.8}

                />

            </h2>

        </div>

    );

}

export default StatsCard;