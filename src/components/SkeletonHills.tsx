export default function SkeletonHills() {
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
