"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import SummaryCard from "@/components/SummaryCard";
import SkeletonHillDetail from "@/components/SkeletonHillDetail";
import HillForecastCharts from "@/components/HillForecastCharts";

type HourlySlot = {
    hour: number;
    timestamp: string;
    powder_score: number | null;
    temperature_2m: number | null;
    wind_speed_10m: number | null;
    wind_gusts_10m: number | null;
    snowfall: number | null;
    rain: number | null;
    snow_depth: number | null;
};

type HillDetail = {
    id: number;
    name: string;
    location: string | null;
    latitude: number;
    longitude: number;
    description: string | null;
    open_time: string | null;
    close_time: string | null;
    lift_risk: "Low" | "Moderate" | "High" | null;
    avg_powder_score: number | null;
    max_powder_score: number | null;
    daily_snowfall: number | null;
    daily_rain: number | null;
    min_temp: number | null;
    max_temp: number | null;
    max_wind: number | null;
    hourly: HourlySlot[];
};

function formatValue(value: number | null, unit = "", decimals = 0) {
    return value !== null ? `${value.toFixed(decimals)}${unit}` : "--";
}

function formatHour(timestamp: string) {
    return new Date(timestamp).toLocaleTimeString("en-CA", {
        hour: "numeric",
        minute: "2-digit",
    });
}

function conditionLabel(score: number | null) {
    if (score === null) return "--";
    if (score >= 80) return "Excellent";
    if (score >= 65) return "Good";
    if (score >= 45) return "Mixed";
    return "Poor";
}

export default function HillDetailPage() {
    const params = useParams();
    const id = params.id;

    const [hill, setHill] = useState<HillDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchHill() {
            try {
                const res = await fetch(`/api/hills/${id}`);
                const data = await res.json();

                if (!data.success) {
                    throw new Error(data.message || "Failed to fetch hill data");
                }

                setHill(data.data);
            } catch (err: unknown) {
                setError(
                    err instanceof Error ? err.message : "Something went wrong"
                );
            } finally {
                setLoading(false);
            }
        }

        if (id) fetchHill();
    }, [id]);

    if (loading) {
        return (
            <div
                className="min-h-screen bg-slate-950 text-slate-100"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
                <SkeletonHillDetail />
            </div>
        );
    }

    if (error || !hill) {
        return (
            <div className="min-h-screen bg-slate-950 px-6 py-20 text-center text-slate-100">
                <p className="text-red-400">{error || "Hill not found"}</p>
                <Link href="/hills" className="mt-4 inline-block text-sky-400">
                    Back to hills
                </Link>
            </div>
        );
    }

    return (
        <div
            className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap');`}</style>

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-sky-900/20 blur-[120px]" />
                <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-900/15 blur-3xl" />
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <main className="relative z-10 mx-auto max-w-7xl px-6 py-12">
                <Link
                    href="/hills"
                    className="mb-8 inline-block text-sm font-medium text-sky-400 hover:text-sky-300"
                >
                    ← Back to all hills
                </Link>

                <section className="flex flex-col gap-6 border-b border-slate-800 pb-8 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-sky-400">
                            {hill.location ?? "Ontario"}
                        </p>

                        <h1
                            className="text-6xl leading-none tracking-wide text-white sm:text-7xl"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            {hill.name}
                        </h1>

                        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
                            {hill.description ?? "No description available."}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-sky-900/60 bg-sky-950/30 px-6 py-5 text-right backdrop-blur">
                        <p className="text-xs uppercase tracking-widest text-slate-500">
                            Day Score
                        </p>
                        <p className="text-5xl font-bold text-sky-300">
                            {formatValue(hill.avg_powder_score)}
                        </p>
                        <p className="mt-1 text-sm text-slate-400">
                            {conditionLabel(hill.avg_powder_score)}
                        </p>
                    </div>
                </section>

                <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
                    <SummaryCard
                        label="Peak Score"
                        value={formatValue(hill.max_powder_score)}
                    />
                    <SummaryCard
                        label="Snowfall"
                        value={formatValue(hill.daily_snowfall, " cm", 1)}
                    />
                    <SummaryCard
                        label="Rain"
                        value={formatValue(hill.daily_rain, " mm", 1)}
                    />
                    <SummaryCard
                        label="Min Temp"
                        value={formatValue(hill.min_temp, "°C", 1)}
                    />
                    <SummaryCard
                        label="Max Temp"
                        value={formatValue(hill.max_temp, "°C", 1)}
                    />
                    <SummaryCard
                        label="Max Wind"
                        value={formatValue(hill.max_wind, " km/h")}
                    />
                    <SummaryCard label="Lift Risk" value={hill.lift_risk ?? "--"} />
                    <SummaryCard
                        label="Hours"
                        value={
                            hill.open_time && hill.close_time
                                ? `${hill.open_time}–${hill.close_time}`
                                : "--"
                        }
                    />
                </section>

                <HillForecastCharts hourly={hill.hourly} />

                <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-white">
                                Hourly Forecast
                            </h2>
                            <p className="text-sm text-slate-400">
                                Powder score, weather, and precipitation for today.
                            </p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <div className="min-w-[850px]">
                            <div className="grid grid-cols-8 border-b border-slate-800 px-4 pb-3 text-[11px] uppercase tracking-widest text-slate-500">
                                <span>Time</span>
                                <span>Score</span>
                                <span>Temp</span>
                                <span>Wind</span>
                                <span>Gust</span>
                                <span>Snow</span>
                                <span>Rain</span>
                                <span>Depth</span>
                            </div>

                            {hill.hourly.length === 0 ? (
                                <p className="py-10 text-center text-slate-400">
                                    No hourly forecast available.
                                </p>
                            ) : (
                                hill.hourly.map((slot) => (
                                    <div
                                        key={slot.timestamp}
                                        className="grid grid-cols-8 items-center border-b border-slate-800/70 px-4 py-4 text-sm transition hover:bg-slate-800/40"
                                    >
                                        <span className="font-medium text-slate-200">
                                            {formatHour(slot.timestamp)}
                                        </span>
                                        <span className="font-semibold text-sky-300">
                                            {formatValue(slot.powder_score)}
                                        </span>
                                        <span>{formatValue(slot.temperature_2m, "°C", 1)}</span>
                                        <span>{formatValue(slot.wind_speed_10m, " km/h")}</span>
                                        <span>{formatValue(slot.wind_gusts_10m, " km/h")}</span>
                                        <span>{formatValue(slot.snowfall, " cm", 1)}</span>
                                        <span>{formatValue(slot.rain, " mm", 1)}</span>
                                        <span>{formatValue(slot.snow_depth, " cm", 1)}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}