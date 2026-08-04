import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

function StockChart({ chart }) {

    if (!chart || !chart.c || chart.c.length === 0) {

        return null;

    }

    const isPositive = chart.c[chart.c.length - 1] >= chart.c[0];

    const chartColor = isPositive ? "#22c55e" : "#ef4444";

    const data = chart.c.map((price, index) => ({
        day: index + 1,
        price
    }));

    const latest = chart.c[chart.c.length - 1];
    const highest = Math.max(...chart.c);
    const lowest = Math.min(...chart.c);

    return (

        <div className="rounded-3xl border border-slate-800 bg-slate-900 shadow-xl p-6 lg:p-8">

            {/* Header */}

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-8">

                <div>

                    <h2 className="text-3xl font-black">

                        📈 Stock Price Trend

                    </h2>

                    <p className="text-slate-500 mt-2">

                        Last 30 Trading Days

                    </p>

                </div>

                <div className="flex gap-4 flex-wrap">

                    <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3">

                        <p className="text-xs uppercase text-slate-500">

                            Current

                        </p>

                        <h3 className="font-bold text-white">

                            ${latest.toFixed(2)}

                        </h3>

                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3">

                        <p className="text-xs uppercase text-slate-500">

                            High

                        </p>

                        <h3 className="font-bold text-green-400">

                            ${highest.toFixed(2)}

                        </h3>

                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3">

                        <p className="text-xs uppercase text-slate-500">

                            Low

                        </p>

                        <h3 className="font-bold text-red-400">

                            ${lowest.toFixed(2)}

                        </h3>

                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3">

                        <p className="text-xs uppercase text-slate-500">

                            Trend

                        </p>

                        <h3
                            className={
                                isPositive
                                    ? "font-bold text-green-400"
                                    : "font-bold text-red-400"
                            }
                        >

                            {isPositive ? "▲ Bullish" : "▼ Bearish"}

                        </h3>

                    </div>

                </div>

            </div>

            {/* Chart */}

            <div className="h-80 lg:h-96">

                <ResponsiveContainer width="100%" height="100%">

                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 10,
                            left: -20,
                            bottom: 0
                        }}
                    >

                        <defs>

                            <linearGradient
                                id="priceGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="5%"
                                    stopColor={chartColor}
                                    stopOpacity={0.65}
                                />

                                <stop
                                    offset="95%"
                                    stopColor={chartColor}
                                    stopOpacity={0.05}
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
                            tick={{
                                fill: "#94a3b8",
                                fontSize: 12
                            }}
                            width={45}
                        />

                        <Tooltip
                            contentStyle={{
                                background: "#020617",
                                border: "1px solid #334155",
                                borderRadius: "14px",
                                color: "#fff"
                            }}
                        />

                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke={chartColor}
                            strokeWidth={3}
                            fill="url(#priceGradient)"
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default StockChart;