"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';


type hillOverview = {
    id: number;
    name: string;
    location: string;
    latitude: number;
    longitude: number;
    description: string | null;
    daily_snowfall: null | number;
    daily_rain: null | number;
    min_temp: null | number;
    max_temp: null | number;
    max_wind: null | number;
    max_powder_score: null | number;
    avg_powder_score: null | number;
}

export default function HillsPage() {
    const [hills, setHills] = useState<hillOverview[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchHills() {
            try {
                const resp = await fetch("/api/hills");
                const data = await resp.json();
                if (data.success) {
                    setHills(data.data);
                } else {
                    console.error("Failed to fetch hills:", data.message);
                }
            } catch (error) {
                console.error("Error fetching hills:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchHills();
    }, []);


    return (
        <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 relative">

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-400/15" />
                <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-300/10" />
            </div>

            <h1 className="text-3xl font-bold text-center p-6 pt-10">
                Ski Hills
            </h1>

            {loading ? (<p className="text-center">Loading hills...</p>) : (
                <div className="grid grid-cols-1 gap-6 m-6 sm:grid-cols-2 xl:grid-cols-3">
                    {hills.map((hill) => (
                        <Link
                            key={hill.id}
                            href={`/hills/${hill.id}`}
                            className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800/80 dark:bg-slate-900/80"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 via-cyan-300/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="relative z-10 flex h-full flex-col">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                                            {hill.name}
                                        </h2>
                                        <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                                            {hill.location}
                                        </p>
                                    </div>

                                    <div className="shrink-0 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-center dark:border-sky-900/60 dark:bg-sky-950/40">
                                        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                            Max Score
                                        </p>
                                        <p className="text-lg font-bold text-sky-700 dark:text-sky-300">
                                            {hill.max_powder_score !== null ? `${hill.max_powder_score.toFixed(0)}` : "--"}
                                        </p>
                                    </div>
                                    <div className="shrink-0 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-center dark:border-sky-900/60 dark:bg-sky-950/40">
                                        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                            Daily Score
                                        </p>
                                        <p className="text-lg font-bold text-sky-700 dark:text-sky-300">
                                            {hill.avg_powder_score !== null ? `${hill.avg_powder_score.toFixed(0)}` : "--"}
                                        </p>
                                    </div>
                                </div>

                                <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                    {hill.description || "No description available."}
                                </p>

                                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                    <div className="rounded-xl bg-slate-100/80 px-3 py-3 dark:bg-slate-800/80">
                                        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                            Snowfall
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                                            {hill.daily_snowfall !== null ? `${hill.daily_snowfall.toFixed(1)} cm` : "--"}
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-slate-100/80 px-3 py-3 dark:bg-slate-800/80">
                                        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                            Rain
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                                            {hill.daily_rain !== null ? `${hill.daily_rain.toFixed(1)} mm` : "--"}
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-slate-100/80 px-3 py-3 dark:bg-slate-800/80">
                                        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                            Max Wind
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                                            {hill.max_wind !== null ? `${hill.max_wind.toFixed(0)} km/h` : "--"}
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-slate-100/80 px-3 py-3 dark:bg-slate-800/80">
                                        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                            Min Temp
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                                            {hill.min_temp !== null ? `${hill.min_temp.toFixed(1)}°C` : "--"}
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-slate-100/80 px-3 py-3 dark:bg-slate-800/80">
                                        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                            Max Temp
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                                            {hill.max_temp !== null ? `${hill.max_temp.toFixed(1)}°C` : "--"}
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-slate-100/80 px-3 py-3 dark:bg-slate-800/80">
                                        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                            Overview
                                        </p>
                                        <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                                            {hill.avg_powder_score !== null
                                                ? hill.avg_powder_score >= 80
                                                    ? "Excellent"
                                                    : hill.avg_powder_score >= 65
                                                        ? "Good"
                                                        : hill.avg_powder_score >= 45
                                                            ? "Fair"
                                                            : "Poor"
                                                : "--"}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 flex items-center justify-between border-t border-slate-200/70 pt-4 text-sm dark:border-slate-800/70">
                                    <span className="text-slate-500 dark:text-slate-400">
                                        View detailed forecast
                                    </span>
                                    <span className="font-medium text-sky-700 transition-transform duration-300 group-hover:translate-x-1 dark:text-sky-300">
                                        Explore →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}