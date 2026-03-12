export default function HillsPage(){
    return (
        <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-400/15" />
            <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-300/10" />
            </div>
            <h1 className="text-2xl font-bold text-center p-4 pt-8 font-sans">Hills Page</h1>
            <a href="/hill" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Go to Hill Page
            </a>
        </div>
    )
}