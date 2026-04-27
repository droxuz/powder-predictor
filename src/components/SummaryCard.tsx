type SummaryCardProps = {
  label: string;
  value: string;
};

export default function SummaryCard({ label, value }: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3 backdrop-blur">
      <p className="mb-1 text-[10px] uppercase tracking-widest text-slate-500">
        {label}
      </p>
      <p className="truncate text-lg font-semibold text-sky-300">
        {value}
      </p>
    </div>
  );
}