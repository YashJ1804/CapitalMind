import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";


function WeeklyChart({ chart, market }) {

    if (!chart) {
        return null;
    }


    // ============================================================
    // Normalize chart data
    // ============================================================

    let data = [];


    // ============================================================
    // USA / Finnhub format
    // { c: [], t: [] }
    // ============================================================

    if (
        Array.isArray(chart.c) &&
        chart.c.length > 0
    ) {

        const prices =
            chart.c.slice(-7);

        const timestamps =
            Array.isArray(chart.t)
                ? chart.t.slice(-7)
                : [];


        data = prices
            .map((price, index) => {

                const numericPrice =
                    Number(price);

                if (!Number.isFinite(
                    numericPrice
                )) {
                    return null;
                }


                let day =
                    `Day ${index + 1}`;


                if (timestamps[index]) {

                    const date =
                        new Date(
                            timestamps[index] * 1000
                        );


                    if (
                        !Number.isNaN(
                            date.getTime()
                        )
                    ) {

                        day =
                            date.toLocaleDateString(
                                "en-US",
                                {
                                    weekday: "short"
                                }
                            );

                    }

                }


                return {
                    day,
                    price: numericPrice
                };

            })
            .filter(Boolean);

    }


    // ============================================================
    // Indian / Yahoo format
    // { history: [...] }
    // ============================================================

    else if (
        Array.isArray(chart.history) &&
        chart.history.length > 0
    ) {

        const weeklyHistory =
            chart.history.slice(-7);


        data =
            weeklyHistory
                .map((item, index) => {

                    const price =
                        Number(
                            item.close ??
                            item.price
                        );


                    if (!Number.isFinite(
                        price
                    )) {
                        return null;
                    }


                    let day =
                        `Day ${index + 1}`;


                    if (item.timestamp) {

                        const date =
                            new Date(
                                item.timestamp * 1000
                            );


                        if (
                            !Number.isNaN(
                                date.getTime()
                            )
                        ) {

                            day =
                                date.toLocaleDateString(
                                    "en-IN",
                                    {
                                        weekday: "short"
                                    }
                                );

                        }

                    }


                    return {
                        day,
                        price
                    };

                })
                .filter(Boolean);

    }


    // ============================================================
    // No usable data
    // ============================================================

    if (data.length === 0) {
        return null;
    }


    // ============================================================
    // Statistics
    // ============================================================

    const prices =
        data.map(
            item => item.price
        );


    const first =
        prices[0];


    const latest =
        prices[prices.length - 1];


    const highest =
        Math.max(...prices);


    const lowest =
        Math.min(...prices);


    const weeklyChange =
        first !== 0
            ? ((latest - first) / first) * 100
            : 0;


    const isPositive =
        weeklyChange >= 0;


    const chartColor =
        isPositive
            ? "#22c55e"
            : "#ef4444";


    const currency =
        market === "INDIA"
            ? "₹"
            : "$";


    return (

        <div className="
            w-full
            rounded-3xl
            border
            border-slate-800
            bg-slate-900
            p-6
            shadow-xl
            lg:p-8
        ">


            {/* ====================================================
                Header
            ===================================================== */}

            <div className="
                mb-6
                flex
                flex-col
                gap-5
                lg:flex-row
                lg:items-center
                lg:justify-between
            ">

                <div>

                    <h2 className="
                        text-2xl
                        font-black
                        text-white
                        sm:text-3xl
                    ">

                        📊 1-Week Price Performance

                    </h2>


                    <p className="
                        mt-2
                        text-sm
                        text-slate-500
                    ">

                        Last 7 trading sessions

                    </p>

                </div>


                <div className="
                    grid
                    grid-cols-2
                    gap-3
                    sm:grid-cols-4
                ">

                    <div className="
                        rounded-xl
                        border
                        border-slate-800
                        bg-slate-950
                        px-4
                        py-3
                    ">

                        <p className="
                            text-xs
                            uppercase
                            tracking-wide
                            text-slate-500
                        ">

                            1W Return

                        </p>

                        <p className={`
                            mt-1
                            font-bold
                            ${
                                isPositive
                                    ? "text-green-400"
                                    : "text-red-400"
                            }
                        `}>

                            {isPositive ? "+" : ""}
                            {weeklyChange.toFixed(2)}%

                        </p>

                    </div>


                    <div className="
                        rounded-xl
                        border
                        border-slate-800
                        bg-slate-950
                        px-4
                        py-3
                    ">

                        <p className="
                            text-xs
                            uppercase
                            tracking-wide
                            text-slate-500
                        ">

                            1W High

                        </p>

                        <p className="
                            mt-1
                            font-bold
                            text-green-400
                        ">

                            {currency}
                            {highest.toFixed(2)}

                        </p>

                    </div>


                    <div className="
                        rounded-xl
                        border
                        border-slate-800
                        bg-slate-950
                        px-4
                        py-3
                    ">

                        <p className="
                            text-xs
                            uppercase
                            tracking-wide
                            text-slate-500
                        ">

                            1W Low

                        </p>

                        <p className="
                            mt-1
                            font-bold
                            text-red-400
                        ">

                            {currency}
                            {lowest.toFixed(2)}

                        </p>

                    </div>


                    <div className="
                        rounded-xl
                        border
                        border-slate-800
                        bg-slate-950
                        px-4
                        py-3
                    ">

                        <p className="
                            text-xs
                            uppercase
                            tracking-wide
                            text-slate-500
                        ">

                            Latest

                        </p>

                        <p className="
                            mt-1
                            font-bold
                            text-white
                        ">

                            {currency}
                            {latest.toFixed(2)}

                        </p>

                    </div>

                </div>

            </div>


            {/* ====================================================
                Chart
            ===================================================== */}

            <div className="h-64 w-full sm:h-72">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 0
                        }}
                    >

                        <defs>

                            <linearGradient
                                id={`weeklyGradient-${market}`}
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="5%"
                                    stopColor={chartColor}
                                    stopOpacity={0.55}
                                />

                                <stop
                                    offset="95%"
                                    stopColor={chartColor}
                                    stopOpacity={0.04}
                                />

                            </linearGradient>

                        </defs>


                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#1e293b"
                        />


                        <XAxis
                            dataKey="day"
                            tick={{
                                fill: "#94a3b8",
                                fontSize: 12
                            }}
                        />


                        <YAxis
                            domain={["auto", "auto"]}
                            tick={{
                                fill: "#94a3b8",
                                fontSize: 12
                            }}
                            width={65}
                        />


                        <Tooltip
                            formatter={(value) => [
                                `${currency}${Number(
                                    value
                                ).toFixed(2)}`,
                                "Price"
                            ]}
                            contentStyle={{
                                background:
                                    "#020617",
                                border:
                                    "1px solid #334155",
                                borderRadius:
                                    "14px",
                                color:
                                    "#fff"
                            }}
                        />


                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke={chartColor}
                            strokeWidth={3}
                            fill={`url(#weeklyGradient-${market})`}
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}


export default WeeklyChart;