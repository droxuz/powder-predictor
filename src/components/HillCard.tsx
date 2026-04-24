import Link from 'next/link';
import StatBox from './StatBox';

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

function scoreLabel(score: number) {
    if (score >= 80) return { text: "Excellent", color: "text-emerald-400" };
    if (score >= 65) return { text: "Good", color: "text-sky-400" };
    if (score >= 45) return { text: "Mixed", color: "text-amber-400" };
    return { text: "Poor", color: "text-rose-400" };
}

function ScoreRing({ score }: { score: number }) {
    const radius = 20;
    const circ = 2 * Math.PI * radius;
    const fill = (score / 100) * circ;
    const color = score >= 80 ? '#34d399' : score >= 65 ? '#38bdf8' : score >= 45 ? '#fbbf24' : '#f87171';

    return (
        <div className="relative flex items-center justify-center" style={{ width: 56, height: 56 }}>
            <svg width="56" height="56" className="-rotate-90" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r={radius} fill="none" stroke="#1e293b" strokeWidth="4" />
                <circle
                    cx="28" cy="28" r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth="4"
                    strokeDasharray={`${fill} ${circ}`}
                    strokeLinecap="round"
                />
            </svg>
            <span className="absolute text-sm font-bold text-white" style={{ color }}>
                {score.toFixed(0)}
            </span>
        </div>
    );
}

export default function HillCard({ hill }: { hill: hillOverview }) {
    const label = hill.avg_powder_score !== null ? scoreLabel(hill.avg_powder_score) : null;

    return (
        <Link
            href={`/hills/${hill.id}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-sky-700/60 hover:shadow-[0_0_30px_rgba(14,165,233,0.12)]"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-cyan-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-4 h-full">

                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-semibold text-white truncate leading-tight">
                            {hill.name}
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                            <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                                <circle cx="12" cy="9" r="2.5"/>
                            </svg>
                            {hill.location}
                        </p>
                    </div>
                    {hill.avg_powder_score !== null ? (
                        <ScoreRing score={hill.avg_powder_score} />
                    ) : (
                        <div className="w-14 h-14 rounded-full border-2 border-slate-800 flex items-center justify-center text-slate-600 text-xs">
                            --
                        </div>
                    )}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed flex-1">
                    {hill.description || "No description available."}
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap gap-2 text-xs">
                    <StatBox label="Peak" value={hill.max_powder_score} unit="" />
                    <StatBox label="Snow" value={hill.daily_snowfall} unit="cm" />
                    <StatBox label="Rain" value={hill.daily_rain} unit="mm" />
                    <StatBox label="Wind" value={hill.max_wind} unit="km/h" />
                    <StatBox label="Lo" value={hill.min_temp} unit="°C" />
                    <StatBox label="Hi" value={hill.max_temp} unit="°C" />
                </div>
                {/* Lift Risk */}
                {(hill.best_window || hill.lift_risk) && (
                    <div className="flex gap-2">
                        {hill.best_window && (
                            <div className="flex-1 rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2">
                                <p className="text-[10px] uppercase tracking-widest text-slate-500">Best window</p>
                                <p className="text-sm font-semibold text-white mt-0.5">{hill.best_window}</p>
                            </div>
                        )}
                        {hill.lift_risk && (
                            <div className="flex-1 rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2">
                                <p className="text-[10px] uppercase tracking-widest text-slate-500">Lift risk</p>
                                <p className={`text-sm font-semibold mt-0.5 flex items-center gap-1.5 ${hill.lift_risk === "Low" ? "text-emerald-400"
                                        : hill.lift_risk === "Moderate" ? "text-amber-400"
                                            : "text-rose-400"
                                    }`}>
                                    <span className={`h-2 w-2 rounded-full ${hill.lift_risk === "Low" ? "bg-emerald-400"
                                            : hill.lift_risk === "Moderate" ? "bg-amber-400"
                                                : "bg-rose-400"
                                        }`} />
                                    {hill.lift_risk}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Why bullets */}
                {hill.why_bullets && hill.why_bullets.length > 0 && (
                    <div className="rounded-lg border border-slate-800/60 bg-slate-950/30 px-3 py-2.5">
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">Why</p>
                        <ul className="space-y-1.5">
                            {hill.why_bullets.map((b, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                                    {b}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                    <div className="flex flex-col gap-0.5">
                        <span className={`text-xs font-medium ${label?.color ?? 'text-slate-500'}`}>
                            {label?.text ?? "No data"}
                        </span>
                        {(hill.open_time && hill.close_time) && (
                            <span className="text-[10px] text-slate-600">
                                {hill.open_time} – {hill.close_time}
                            </span>
                        )}
                    </div>
                    <span className="text-sky-500 text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        View details
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </span>
                </div>

            </div>
        </Link>
    );
}