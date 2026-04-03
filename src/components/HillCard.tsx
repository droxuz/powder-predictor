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
};
export default function HillCard({ hill }: {hill : hillOverview}){
    return(
        <Link
            key={hill.id}
            href={`/hills/${hill.id}`}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/70 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800/60 dark:bg-slate-900/70"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 via-cyan-300/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative z-10 flex flex-col gap-4">

                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-xl font-semibold tracking-tight">
                            {hill.name}
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {hill.location}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-xs uppercase text-slate-500">Day </p>
                        <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                            {hill.avg_powder_score !== null
                                ? hill.avg_powder_score.toFixed(0)
                                : "--"}
                        </p>
                    </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                    {hill.description || "No description available."}
                </p>

                <div className="flex flex-wrap gap-3 text-sm">
                    <StatBox label="Peak" value={hill.max_powder_score} unit="" />
                    <StatBox label="Snow" value={hill.daily_snowfall} unit="cm" />
                    <StatBox label="Rain" value={hill.daily_rain} unit="mm" />
                    <StatBox label="Wind" value={hill.max_wind} unit="km/h" />
                    <StatBox label="Temp" value={hill.min_temp} unit="°C" />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                    <span className="text-sm text-slate-500">
                        {hill.avg_powder_score !== null
                            ? hill.avg_powder_score >= 80
                                ? "Excellent day"
                                : hill.avg_powder_score >= 65
                                    ? "Good conditions"
                                    : hill.avg_powder_score >= 45
                                        ? "Mixed conditions"
                                        : "Poor conditions"
                            : "--"}
                    </span>

                    <span className="text-sky-600 dark:text-sky-400 text-sm font-medium group-hover:translate-x-1 transition">
                        View →
                    </span>
                </div>

            </div>
        </Link>
    );
}