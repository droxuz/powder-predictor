type StatBoxContent = {
    label: string;
    value: number | null;
    unit: string | null;
};

export default function StatBox({ label, value, unit }: StatBoxContent){
    return(
        <div className="rounded-lg bg-slate-100/70 px-3 py-2 dark:bg-slate-800/70">
        <p className="text-[10px] uppercase text-slate-500">{label}</p>
        <p className="font-semibold">
        {value !== null ? `${value.toFixed(0)}${unit ?? ""}` : "--"}
      </p>
    </div>
    );
}
    
