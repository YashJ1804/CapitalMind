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
    const isPositive =
    chart.c[chart.c.length - 1] >= chart.c[0];

const chartColor = isPositive
    ? "#22c55e"
    : "#ef4444";

    const data = chart.c.map((price, index) => ({

        day: index + 1,

        price

    }));

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:border-slate-700 transition-all duration-300">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">

                    📈 Stock Price Trend

                </h2>
                <span

    className={`text-sm font-semibold ${
        isPositive
            ? "text-green-400"
            : "text-red-400"
    }`}

>

    {isPositive ? "▲ Uptrend" : "▼ Downtrend"}

</span>

                <span className="text-slate-400 text-sm">

                    Last 30 Trading Days

                </span>

            </div>

            <div className="w-full overflow-x-auto">

                <div className="h-64 sm:h-72 lg:h-80">

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

                                        stopOpacity={0.7}

                                    />

                                    <stop

                                        offset="95%"

                                        stopColor="#3b82f6"

                                        stopOpacity={0.05}

                                    />

                                </linearGradient>

                            </defs>

                            <CartesianGrid

                                strokeDasharray="3 3"

                                stroke="#334155"

                            />

                            <XAxis

                                dataKey="day"

                                tick={{ fill: "#94a3b8", fontSize: 12 }}

                            />

                            <YAxis

                                tick={{ fill: "#94a3b8", fontSize: 12 }}

                                width={45}

                            />

                            <Tooltip

                                contentStyle={{

                                    backgroundColor: "#0f172a",

                                    border: "1px solid #334155",

                                    borderRadius: "12px",

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

        </div>

    );

}

export default StockChart;