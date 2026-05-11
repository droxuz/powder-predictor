"use client";

import {
    Bar,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type HourlySlot = {
    timestamp: string;
    powder_score: number | null;
    temperature_2m: number | null;
    wind_speed_10m: number | null;
    wind_gusts_10m: number | null;
    snowfall: number | null;
    rain: number | null;
    snow_depth: number | null;
};

type HillForecastChartsProps = {
    hourly: HourlySlot[];
};

type ForecastChartPoint = {
    timestamp: string;
    powderScore: number | null;
    temperature: number | null;
    windSpeed: number | null;
    windGusts: number | null;
    snowfall: number | null;
    rain: number | null;
    snowDepth: number | null;
};

type MetricConfig = {
    label: string;
    unit: string;
    decimals: number;
};

const metricConfig: Record<string, MetricConfig> = {
    powderScore: { label: "Powder score", unit: "", decimals: 0 },
    temperature: { label: "Temperature", unit: "°C", decimals: 1 },
    windSpeed: { label: "Wind", unit: " km/h", decimals: 0 },
    windGusts: { label: "Gusts", unit: " km/h", decimals: 0 },
    snowfall: { label: "Snowfall", unit: " cm", decimals: 1 },
    rain: { label: "Rain", unit: " mm", decimals: 1 },
    snowDepth: { label: "Snow depth", unit: " cm", decimals: 1 },
};

function formatAxisTimestamp(timestamp: string) {
    const date = new Date(timestamp);

    return date.toLocaleString("en-CA", {
        month: "short",
        day: "numeric",
        hour: "numeric",
    });
}

function formatTooltipTimestamp(value: unknown) {
    const date = new Date(String(value));

    return date.toLocaleString("en-CA", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}

function formatTooltipValue(value: unknown, name: unknown): [string, string] {
    const key = String(name);
    const config = metricConfig[key] ?? { label: key, unit: "", decimals: 0 };

    if (typeof value !== "number") {
        return ["--", config.label];
    }

    return [`${value.toFixed(config.decimals)}${config.unit}`, config.label];
}

function formatAxisValue(value: unknown) {
    return typeof value === "number" ? value.toString() : "";
}

const axisTick = { fill: "#94a3b8", fontSize: 12 };
const chartMargin = { top: 18, right: 12, left: -16, bottom: 0 };

const tooltipStyle = {
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: "12px",
};

export default function HillForecastCharts({ hourly }: HillForecastChartsProps) {
    const chartData: ForecastChartPoint[] = hourly.map((slot) => ({
        timestamp: slot.timestamp,
        powderScore: slot.powder_score,
        temperature: slot.temperature_2m,
        windSpeed: slot.wind_speed_10m,
        windGusts: slot.wind_gusts_10m,
        snowfall: slot.snowfall,
        rain: slot.rain,
        snowDepth: slot.snow_depth,
    }));

    return (
        <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.3em] text-sky-400">
                        Data Visualization
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold text-white">
                        Forecast Data
                    </h2>

                    <p className="text-sm text-slate-400">
                        Recharts combines score, temperature, wind, gusts,
                        precipitation, and snow depth.
                    </p>
                </div>

                <p className="text-xs uppercase tracking-widest text-slate-500">
                    {chartData.length} hourly samples
                </p>
            </div>

            {chartData.length === 0 ? (
                <p className="rounded-xl border border-slate-800 bg-slate-950/40 py-12 text-center text-slate-400">
                    No hourly data available to visualize.
                </p>
            ) : (
                <div className="h-[34rem] min-h-[34rem] min-w-0 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                    <ResponsiveContainer width="100%" height={500}>
                        <ComposedChart data={chartData} margin={chartMargin}>
                            <CartesianGrid stroke="#1e293b" strokeDasharray="4 4" />

                            <XAxis
                                dataKey="timestamp"
                                minTickGap={28}
                                tick={axisTick}
                                tickLine={false}
                                axisLine={{ stroke: "#334155" }}
                                tickFormatter={formatAxisTimestamp}
                            />

                            <YAxis
                                yAxisId="score"
                                domain={[0, 100]}
                                tick={axisTick}
                                tickFormatter={formatAxisValue}
                                tickLine={false}
                                axisLine={{ stroke: "#334155" }}
                                label={{
                                    value: "Score / cm / mm",
                                    angle: -90,
                                    position: "insideLeft",
                                    fill: "#94a3b8",
                                    fontSize: 12,
                                }}
                            />

                            <YAxis
                                yAxisId="weather"
                                orientation="right"
                                tick={axisTick}
                                tickFormatter={formatAxisValue}
                                tickLine={false}
                                axisLine={{ stroke: "#334155" }}
                                label={{
                                    value: "°C / km/h",
                                    angle: 90,
                                    position: "insideRight",
                                    fill: "#94a3b8",
                                    fontSize: 12,
                                }}
                            />

                            <Tooltip
                                formatter={formatTooltipValue}
                                labelFormatter={formatTooltipTimestamp}
                                contentStyle={tooltipStyle}
                                labelStyle={{ color: "#e2e8f0" }}
                            />

                            <Legend
                                iconType="circle"
                                wrapperStyle={{ color: "#cbd5e1", fontSize: 12 }}
                            />

                            <ReferenceLine
                                yAxisId="score"
                                y={65}
                                stroke="#38bdf8"
                                strokeDasharray="6 6"
                                label={{
                                    value: "Good powder",
                                    fill: "#7dd3fc",
                                    fontSize: 12,
                                    position: "insideTopLeft",
                                }}
                            />

                            <Bar
                                yAxisId="score"
                                dataKey="snowfall"
                                name="snowfall"
                                fill="#bae6fd"
                                radius={[6, 6, 0, 0]}
                            />

                            <Bar
                                yAxisId="score"
                                dataKey="rain"
                                name="rain"
                                fill="#0ea5e9"
                                radius={[6, 6, 0, 0]}
                            />

                            <Line
                                yAxisId="score"
                                type="monotone"
                                dataKey="powderScore"
                                name="powderScore"
                                stroke="#38bdf8"
                                strokeWidth={3}
                                connectNulls
                            />

                            <Line
                                yAxisId="score"
                                type="monotone"
                                dataKey="snowDepth"
                                name="snowDepth"
                                stroke="#e0f2fe"
                                strokeWidth={2}
                                dot={false}
                                connectNulls
                            />

                            <Line
                                yAxisId="weather"
                                type="monotone"
                                dataKey="temperature"
                                name="temperature"
                                stroke="#a78bfa"
                                strokeWidth={1}
                                dot={false}
                                connectNulls
                            />

                            <Line
                                yAxisId="weather"
                                type="monotone"
                                dataKey="windSpeed"
                                name="windSpeed"
                                stroke="#22d3ee"
                                strokeWidth={1}
                                dot={false}
                                connectNulls
                            />

                            <Line
                                yAxisId="weather"
                                type="monotone"
                                dataKey="windGusts"
                                name="windGusts"
                                stroke="#fb7185"
                                strokeDasharray="5 5"
                                strokeWidth={2}
                                dot={false}
                                connectNulls
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            )}
        </section>
    );
}