export default function SkeletonHillDetail() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <div className="animate-pulse">
        <div className="mb-4 h-6 w-32 rounded bg-slate-800" />
        <div className="mb-3 h-14 w-72 rounded bg-slate-800" />
        <div className="mb-8 h-4 w-96 rounded bg-slate-800" />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-slate-900/70" />
          ))}
        </div>

        <div className="mt-8 h-96 rounded-2xl bg-slate-900/70" />
      </div>
    </div>
  );
}