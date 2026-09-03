import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

function IndexChart({
    data,
    indexName,
    range
}) {

    const chartData = data.map((item) => ({
        date: new Date(item.date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short"
            }
        ),

        price: item.close
    }));

    const firstPrice =
        chartData[0]?.price || 0;

    const lastPrice =
        chartData[chartData.length - 1]?.price || 0;

    const isPositive =
        lastPrice >= firstPrice;

    return (

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

            {/* Header */}

            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <p className="text-sm font-medium text-slate-500">
                        HISTORICAL PERFORMANCE
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-white">
                        {indexName}
                    </h2>

                </div>

                <div
                    className={`text-xl font-bold ${
                        isPositive
                            ? "text-green-400"
                            : "text-red-400"
                    }`}
                >
                    {isPositive ? "▲" : "▼"}{" "}
                    {Math.abs(
                        ((lastPrice - firstPrice) /
                            firstPrice) *
                            100
                    ).toFixed(2)}
                    %
                </div>

            </div>

            {/* Chart */}

            <div className="h-[400px] w-full">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <AreaChart
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 10
                        }}
                    >

                        <defs>

                            <linearGradient
                                id="marketGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="0%"
                                    stopColor={
                                        isPositive
                                            ? "#22c55e"
                                            : "#ef4444"
                                    }
                                    stopOpacity={0.35}
                                />

                                <stop
                                    offset="100%"
                                    stopColor={
                                        isPositive
                                            ? "#22c55e"
                                            : "#ef4444"
                                    }
                                    stopOpacity={0}
                                />

                            </linearGradient>

                        </defs>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#1e293b"
                        />

                        <XAxis
                            dataKey="date"
                            stroke="#64748b"
                            tick={{ fontSize: 12 }}
                        />

                        <YAxis
                            stroke="#64748b"
                            tick={{ fontSize: 12 }}
                            domain={["auto", "auto"]}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#020617",
                                border: "1px solid #334155",
                                borderRadius: "12px",
                                color: "#fff"
                            }}
                            formatter={(value) => [
                                `₹${Number(value).toLocaleString(
                                    "en-IN",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    }
                                )}`,
                                "Price"
                            ]}
                        />

                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke={
                                isPositive
                                    ? "#22c55e"
                                    : "#ef4444"
                            }
                            fill="url(#marketGradient)"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{
                                r: 6
                            }}
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

            {/* Range */}

            <div className="mt-6 text-center text-sm text-slate-500">

                Showing {range} historical performance

            </div>

        </div>

    );

}

export default IndexChart;