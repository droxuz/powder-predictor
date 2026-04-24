"use client";

import HillCard from '../../components/HillCard';
import { useState, useEffect } from 'react';

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
    lift_risk: "Low" | "Moderate" | "High" | null;
    best_window: string | null;
    why_bullets: string[] | null;
    open_time: string | null;
    close_time: string | null;
};

function SkeletonCard() {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 animate-pulse">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="h-5 w-36 bg-slate-700 rounded mb-2" />
                    <div className="h-3 w-24 bg-slate-800 rounded" />
                </div>
                <div className="h-10 w-12 bg-slate-700 rounded" />
            </div>
            <div className="h-3 w-full bg-slate-800 rounded mb-2" />
            <div className="h-3 w-4/5 bg-slate-800 rounded mb-5" />
            <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-10 w-14 bg-slate-800 rounded-lg" />
                ))}
            </div>
        </div>
    );
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

    const hillsWithScores = hills.filter(h => h.avg_powder_score !== null);
    const bestHill = hillsWithScores.length
        ? hillsWithScores.reduce((a, b) =>
            (a.avg_powder_score ?? 0) > (b.avg_powder_score ?? 0) ? a : b)
        : null;
    const avgScore = hillsWithScores.length
        ? hillsWithScores.reduce((sum, h) => sum + (h.avg_powder_score ?? 0), 0) / hillsWithScores.length
        : null;
    const totalSnow = hills.reduce((sum, h) => sum + (h.daily_snowfall ?? 0), 0);

    return (
        <div
            className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
            {/* Google Font import via style tag trick */}
            <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap');`}</style>

            {/* Background atmosphere */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-sky-900/20 blur-[120px]" />
                <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-900/15 blur-3xl" />
                {/* Subtle grid lines */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            {/* Header */}
            <header className="relative z-10 pt-14 pb-8 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <p
                            className="text-xs tracking-[0.3em] uppercase text-sky-400 mb-2 font-medium"
                        >
                            Ontario · Today's Conditions
                        </p>
                        <h1
                            className="text-6xl sm:text-7xl text-white leading-none tracking-wide"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                            Ski Hills
                        </h1>
                    </div>
                    <p className="text-slate-400 text-sm max-w-xs text-right hidden sm:block">
                        Live powder scores updated daily from forecast data across Ontario's ski resorts.
                    </p>
                </div>

                {/* Divider */}
                <div className="mt-6 h-px bg-gradient-to-r from-sky-500/50 via-slate-700 to-transparent" />

                {/* Summary stats bar */}
                {!loading && hills.length > 0 && (
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { label: "Hills Tracked", value: hills.length.toString() },
                            { label: "Best Today", value: bestHill?.name ?? "--" },
                            { label: "Avg Score", value: avgScore !== null ? avgScore.toFixed(0) : "--" },
                            { label: "Total Snowfall", value: totalSnow > 0 ? `${totalSnow.toFixed(0)} cm` : "--" },
                        ].map(({ label, value }) => (
                            <div
                                key={label}
                                className="rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3 backdrop-blur"
                            >
                                <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">{label}</p>
                                <p className="text-lg font-semibold text-sky-300 truncate">{value}</p>
                            </div>
                        ))}
                    </div>
                )}
            </header>

            
            <main className="relative z-10 max-w-7xl mx-auto px-6 pb-16">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {loading
                        ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
                        : hills.map((hill, i) => (
                            <div
                                key={hill.id}
                                style={{
                                    animationDelay: `${i * 60}ms`,
                                    animation: 'fadeSlideUp 0.4s ease both',
                                }}
                            >
                                <HillCard hill={hill} />
                            </div>
                        ))
                    }
                </div>
            </main>

            
            <style>{`
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            
        </div>
    );
}