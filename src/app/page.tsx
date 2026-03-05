
export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-400/15" />
        <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-300/10" />
      </div>

      <div className="relative">
        {/* Header */}
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-400/15 ring-1 ring-sky-400/30 dark:bg-sky-400/10 dark:ring-sky-400/25">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-sky-500 dark:text-sky-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 17.5A4.5 4.5 0 0 0 16.5 10a6 6 0 0 0-11.7 1.7A4 4 0 0 0 5 20h11.5A3.5 3.5 0 0 0 20 17.5Z" />
                <path d="M8 17l1.5-2L11 17l1.5-2L14 17" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="text-lg font-semibold tracking-wide font-sans">
                PowderPredictor
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Ontario ski conditions</div>
            </div>
          </div>

          <nav className="hidden items-center gap-2 sm:flex">
            <a
              href="#how"
              className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              How it works
            </a>
            <a
              href="#features"
              className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              Features
            </a>
            <a
              href="#"
              className="rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950"
            >
              View hills
            </a>
          </nav>

          <a
            href="#"
            className="sm:hidden rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950"
          >
            View
          </a>
        </header>

        {/* Hero */}
        <main className="mx-auto w-full max-w-6xl px-4 pb-14 pt-10 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-400/30 dark:text-sky-300 dark:ring-sky-400/25">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-sky-400" />
                Live forecast scoring (Open-Meteo)
              </div>

              <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
                Know the snow before you go.
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-700 dark:text-slate-300 sm:text-lg">
                PowderPredictor converts weather forecasts into a simple condition score for each hill.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950"
                >
                  Explore hills
                  <svg
                    className="ml-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 5l7 7-7 7" />
                  </svg>
                </a>

                <a
                  href="#how"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-white dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus:ring-offset-slate-950"
                >
                  How scoring works
                </a>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/40">
                  <div className="text-sm font-semibold">Condition score</div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    0–100 rating based on snow, temp, wind, and freeze-thaw.
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/40">
                  <div className="text-sm font-semibold">Best ride window</div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Finds an optimal time frame to ski based on forecast patterns.
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/40">
                  <div className="text-sm font-semibold">Lift risk</div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Assesses the likelihood of lift closures and comfort levels due to weather conditions.
                  </div>
                </div>
              </div>
            </div>

            {/* Preview card */}
            <div className="relative">
              <div className="rounded-2xl border-2 border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/40">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Blue Mountain</div>
                    <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                      Next 24h • Updated hourly
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-400/30 dark:text-sky-300 dark:ring-sky-400/25">
                    Packed / Good
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                    <div className="text-xs text-slate-600 dark:text-slate-400">Score</div>
                    <div className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                      82
                      <span className="ml-1 text-base font-semibold text-sky-600 dark:text-sky-400">/100</span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                    <div className="text-xs text-slate-600 dark:text-slate-400">Best window</div>
                    <div className="mt-2 text-sm font-semibold">8:00–10:00</div>
                    <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">Low wind • Cold temps</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                    <div className="text-xs text-slate-600 dark:text-slate-400">Lift risk</div>
                    <div className="mt-2 inline-flex items-center gap-2 text-sm font-semibold">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Low
                    </div>
                    <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">Gusts 22 km/h</div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <div className="text-sm font-semibold">Why</div>
                  <ul className="mt-2 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500 dark:bg-sky-400" />
                      4 cm snowfall in the last 12 hours
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500 dark:bg-sky-400" />
                      Temps stayed below −3°C (low melt risk)
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500 dark:bg-sky-400" />
                      No rain detected; moderate cloud cover
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 text-center text-xs text-slate-600 dark:text-slate-400">
                Preview UI — scores update from hourly forecasts.
              </div>
            </div>
          </div>

          {/* How it works */}
          <section id="how" className="mt-16">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
              <span className="hidden sm:inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                Baseline v1 (rule-based)
              </span>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/40">
                <div className="text-sm font-semibold">1) Fetch hourly weather</div>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                  Pulls temperature, snowfall, precipitation, wind, and cloud cover from Open-Meteo.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/40">
                <div className="text-sm font-semibold">2) Compute rolling signals</div>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                  Detects fresh snow, rain risk, wind impact, and freeze-thaw patterns.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/40">
                <div className="text-sm font-semibold">3) Score + label</div>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                  Converts signals into a 0-100 score for each ski hill.
                </p>
              </div>
            </div>
          </section>

          {/* Features */}
          <section id="features" className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight">Features</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/40">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-sky-400/10 ring-1 ring-sky-400/25">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-sky-600 dark:text-sky-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 19h16" />
                      <path d="M6 19V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10" />
                      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
                    </svg>
                  </div>
                  <div className="text-sm font-semibold">Ontario hill directory</div>
                </div>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                  Add a searchable list and a map view with color-coded condition scores.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/40">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-sky-400/10 ring-1 ring-sky-400/25">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-sky-600 dark:text-sky-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 12h6l2-3 2 6 2-3h4" />
                      <path d="M4 19h16" />
                    </svg>
                  </div>
                  <div className="text-sm font-semibold">Hourly charts</div>
                </div>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                  Temperature and snowfall graphs, plus a timeline of the condition score.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/40">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-sky-400/10 ring-1 ring-sky-400/25">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-sky-600 dark:text-sky-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10Z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <div className="text-sm font-semibold">Confidence meter</div>
                </div>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                  Explain uncertainty based on wind, near-zero temperatures, and precipitation type.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/40">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-sky-400/10 ring-1 ring-sky-400/25">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-sky-600 dark:text-sky-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 3v10" />
                      <path d="M7 8l5 5 5-5" />
                      <path d="M5 21h14" />
                    </svg>
                  </div>
                  <div className="text-sm font-semibold">Alerts (later)</div>
                </div>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                  Notify when a hill exceeds your score threshold for the next morning.
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-16 border-t border-slate-200 py-8 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>© {new Date().getFullYear()} PowderPredictor</div>
              <div>Disclaimer: Score, Best window, Lift risk assessments are for informational purposes only.</div>
              
              <div className="flex items-center gap-4">
                <a className="hover:text-slate-900 dark:hover:text-slate-100" href="#how">
                  Method
                </a>
                <a className="hover:text-slate-900 dark:hover:text-slate-100" href="#features">
                  Roadmap
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}