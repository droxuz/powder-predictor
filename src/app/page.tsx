export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Bebas+Neue&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes scrollLine {
          0%   { transform: scaleY(0); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: top; }
          51%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }

        .anim-1 { animation: fadeUp 0.7s ease both 0.1s; }
        .anim-2 { animation: fadeUp 0.7s ease both 0.25s; }
        .anim-3 { animation: fadeUp 0.7s ease both 0.4s; }
        .anim-4 { animation: fadeUp 0.7s ease both 0.55s; }
        .anim-5 { animation: fadeUp 0.7s ease both 0.7s; }
        .anim-card { animation: fadeIn 0.6s ease both 0.8s; }

        .float { animation: floatSlow 6s ease-in-out infinite; }

        .score-ring::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid #38bdf8;
          animation: pulse-ring 2s ease-out infinite;
        }

        .gradient-text {
          background: linear-gradient(135deg, #e0f2fe 0%, #38bdf8 50%, #0ea5e9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-link {
          position: relative;
          color: #94a3b8;
          font-size: 0.875rem;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #e0f2fe; }

        .feature-card {
          border: 1px solid #1e293b;
          background: linear-gradient(135deg, rgba(15,23,42,0.8), rgba(15,23,42,0.4));
          border-radius: 1rem;
          padding: 1.5rem;
          backdrop-filter: blur(8px);
          transition: border-color 0.3s, transform 0.3s;
        }
        .feature-card:hover {
          border-color: rgba(56,189,248,0.3);
          transform: translateY(-2px);
        }

        .step-card {
          position: relative;
          border: 1px solid #1e293b;
          background: rgba(15,23,42,0.6);
          border-radius: 1rem;
          padding: 1.5rem;
          overflow: hidden;
        }
        .step-card::before {
          content: attr(data-num);
          position: absolute;
          top: -0.5rem;
          right: 1rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 5rem;
          color: rgba(56,189,248,0.06);
          line-height: 1;
          pointer-events: none;
        }

        .mountain-bg {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 220px;
          opacity: 0.07;
        }

        .stat-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          background: rgba(56,189,248,0.08);
          border: 1px solid rgba(56,189,248,0.2);
          border-radius: 9999px;
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          color: #7dd3fc;
          font-weight: 500;
        }

        .preview-card {
          background: linear-gradient(135deg, rgba(15,23,42,0.95), rgba(2,6,23,0.9));
          border: 1px solid #1e293b;
          border-radius: 1.25rem;
          padding: 1.5rem;
          backdrop-filter: blur(12px);
          box-shadow: 0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(56,189,248,0.05);
        }

        .score-display {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 3.5rem;
          line-height: 1;
          background: linear-gradient(135deg, #ffffff, #38bdf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .divider-line {
          height: 1px;
          background: linear-gradient(90deg, rgba(56,189,248,0.4), rgba(30,41,59,0.8), transparent);
        }

        .grid-bg {
          background-image: linear-gradient(rgba(148,163,184,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>

      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[1000px] rounded-full bg-sky-900/20 blur-[140px]" />
        <div className="absolute bottom-1/3 -right-32 h-80 w-80 rounded-full bg-cyan-900/15 blur-3xl" />
        <div className="absolute top-1/2 -left-20 h-60 w-60 rounded-full bg-sky-950/30 blur-3xl" />
        {/* Subtle grid */}
        <div className="absolute inset-0 grid-bg opacity-[0.025]" />
      </div>

      <div className="relative">

        {/* ── NAV ───────────────────────────────────────────────── */}
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-sky-500/10 ring-1 ring-sky-500/25">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-sky-400" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 17.5A4.5 4.5 0 0 0 16.5 10a6 6 0 0 0-11.7 1.7A4 4 0 0 0 5 20h11.5A3.5 3.5 0 0 0 20 17.5Z" />
                <path d="M8 17l1.5-2L11 17l1.5-2L14 17" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="text-base font-semibold tracking-wide text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.25rem', letterSpacing: '0.08em' }}>
                PowderPredictor
              </div>
              <div className="text-[10px] tracking-widest uppercase text-slate-500">Ontario ski conditions</div>
            </div>
          </div>

          <nav className="hidden items-center gap-1 sm:flex">
            <a href="#how" className="nav-link">How it works</a>
            <a href="#features" className="nav-link">Features</a>
            <a
              href="/hills"
              className="ml-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 hover:bg-sky-400 transition-colors"
            >
              View hills →
            </a>
          </nav>

          <a href="/hills" className="sm:hidden rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold text-white">
            View
          </a>
        </header>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <main className="mx-auto w-full max-w-6xl px-6 pb-0 pt-10 lg:px-8">

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

            {/* Left col */}
            <div>
              <div className="anim-1 stat-pill w-fit mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                Live · Open-Meteo forecast data
              </div>

              <h1
                className="anim-2 leading-none tracking-wide text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3.5rem, 8vw, 6rem)' }}
              >
                Know the snow<br />
                <span className="gradient-text">before you go.</span>
              </h1>

              <p className="anim-3 mt-5 max-w-lg text-base leading-relaxed text-slate-400" style={{ fontStyle: 'italic', fontWeight: 300 }}>
                PowderPredictor converts hourly weather forecasts into a simple 0–100 condition score for every Ontario ski hill — updated daily.
              </p>

              <div className="anim-4 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="/hills"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 hover:bg-sky-400 transition-all hover:-translate-y-0.5"
                >
                  Explore hills
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="#how"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-300 hover:border-slate-700 hover:text-white transition-all"
                >
                  How scoring works
                </a>
              </div>

              {/* 3 mini feature pills */}
              <div className="anim-5 mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { icon: "M9 19V6l12-3v13", label: "Condition score", sub: "0–100 based on snow, temp & wind" },
                  { icon: "M12 6v6l4 2", label: "Best ride window", sub: "Optimal time to hit the slopes" },
                  { icon: "M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10Z", label: "Lift risk", sub: "Closure likelihood assessment" },
                ].map(({ icon, label, sub }) => (
                  <div key={label} className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4">
                    <svg className="h-5 w-5 text-sky-400 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <path d={icon} />
                    </svg>
                    <div className="text-sm font-semibold text-white">{label}</div>
                    <div className="mt-0.5 text-xs text-slate-500 leading-relaxed">{sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right col — preview card */}
            <div className="anim-card float">
              <div className="preview-card">
                {/* Card header */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Live preview</p>
                    <div className="text-lg font-semibold text-white">Blue Mountain</div>
                    <div className="text-xs text-slate-500 mt-0.5">Next 24h · Updated hourly</div>
                  </div>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                    Packed / Good
                  </span>
                </div>

                <div className="divider-line mb-5" />

                {/* Score + stats row */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Score</div>
                    <div className="score-display">82</div>
                    <div className="text-xs text-slate-500 mt-1">/100</div>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Best window</div>
                    <div className="text-sm font-semibold text-white mt-2">8:00–10:00</div>
                    <div className="text-xs text-slate-500 mt-1">Low wind · Cold</div>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Lift risk</div>
                    <div className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-emerald-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      Low
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Gusts 22 km/h</div>
                  </div>
                </div>

                {/* Why box */}
                <div className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-4">
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Why this score</div>
                  <ul className="space-y-2">
                    {[
                      "4 cm snowfall in the last 12 hours",
                      "Temps stayed below −3 °C (low melt risk)",
                      "No rain detected; moderate cloud cover",
                    ].map(item => (
                      <li key={item} className="flex items-start gap-2 text-xs text-slate-400">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-center text-[10px] text-slate-600 mt-4">Preview UI — scores update from hourly forecasts</p>
              </div>
            </div>
          </div>

          {/* ── HOW IT WORKS ──────────────────────────────────────── */}
          <section id="how" className="mt-28">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-sky-500 mb-2">Under the hood</p>
                <h2
                  className="text-white leading-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.75rem', letterSpacing: '0.04em' }}
                >
                  How it works
                </h2>
              </div>
              <span className="hidden sm:inline-flex rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-400">
                Baseline v1 · rule-based
              </span>
            </div>

            <div className="divider-line mb-8" />

            <div className="grid gap-4 lg:grid-cols-3">
              {[
                { n: "01", title: "Fetch hourly weather", body: "Pulls temperature, snowfall, precipitation, wind, and cloud cover from Open-Meteo for each hill's exact coordinates." },
                { n: "02", title: "Compute rolling signals", body: "Detects fresh snow accumulation, rain contamination risk, wind impact on lift operations, and freeze-thaw patterns across the day." },
                { n: "03", title: "Score + label", body: "Converts all signals into a 0–100 powder score and a plain-English condition label for each ski hill." },
              ].map(({ n, title, body }) => (
                <div key={n} className="step-card" data-num={n}>
                  <div
                    className="text-sky-400 mb-3"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', letterSpacing: '0.15em' }}
                  >
                    {n}
                  </div>
                  <div className="text-base font-semibold text-white mb-2">{title}</div>
                  <p className="text-sm text-slate-400 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── FEATURES ──────────────────────────────────────────── */}
          <section id="features" className="mt-24">
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-widest text-sky-500 mb-2">What's included</p>
              <h2
                className="text-white leading-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.75rem', letterSpacing: '0.04em' }}
              >
                Features
              </h2>
            </div>

            <div className="divider-line mb-8" />

            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  icon: "M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 1.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0 0 21 18.382V7.618a1 1 0 0 0-1.447-.894L15 9m0 8V9m0 0L9 7",
                  label: "Ontario hill directory",
                  body: "Searchable list with color-coded condition scores and a live map view across the province.",
                  badge: "Live",
                },
                {
                  icon: "M4 12h6l2-3 2 6 2-3h4",
                  label: "Hourly charts",
                  body: "Temperature and snowfall graphs plus a full timeline of the condition score through the day.",
                  badge: "Coming soon",
                },
                {
                  icon: "M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10ZM9 12l2 2 4-4",
                  label: "Confidence meter",
                  body: "Explains uncertainty from near-zero temperatures, ambiguous precipitation type, and gusty wind.",
                  badge: "Coming soon",
                },
                {
                  icon: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
                  label: "Powder alerts",
                  body: "Get notified when a hill crosses your score threshold the night before you plan to ride.",
                  badge: "Planned",
                },
              ].map(({ icon, label, body, badge }) => (
                <div key={label} className="feature-card group">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-500/10 ring-1 ring-sky-500/20 shrink-0">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 text-sky-400" fill="none" stroke="currentColor" strokeWidth="1.75">
                        <path d={icon} />
                      </svg>
                    </div>
                    <span className="rounded-full border border-slate-700 bg-slate-800/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {badge}
                    </span>
                  </div>
                  <div className="text-base font-semibold text-white mb-1.5">{label}</div>
                  <p className="text-sm text-slate-400 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA BANNER ────────────────────────────────────────── */}
          <section className="mt-24 rounded-2xl border border-sky-900/40 bg-gradient-to-br from-sky-950/60 via-slate-900/60 to-slate-950/60 p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
            </div>
            <p className="relative text-[10px] uppercase tracking-widest text-sky-500 mb-3">Ready to shred?</p>
            <h2
              className="relative text-white mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '0.04em' }}
            >
              Find your best day on the mountain.
            </h2>
            <p className="relative text-slate-400 text-sm max-w-md mx-auto mb-8">
              Live powder scores for every Ontario ski hill, updated daily from forecast data.
            </p>
            <a
              href="/hills"
              className="relative inline-flex items-center gap-2 rounded-xl bg-sky-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 hover:bg-sky-400 transition-all hover:-translate-y-0.5"
            >
              View all hills
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </section>

          {/* ── FOOTER ────────────────────────────────────────────── */}
          <footer className="mt-16 border-t border-slate-800/60 py-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <div className="grid h-6 w-6 place-items-center rounded-lg bg-sky-500/10 ring-1 ring-sky-500/20">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-sky-400" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 17.5A4.5 4.5 0 0 0 16.5 10a6 6 0 0 0-11.7 1.7A4 4 0 0 0 5 20h11.5A3.5 3.5 0 0 0 20 17.5Z" />
                    <path d="M8 17l1.5-2L11 17l1.5-2L14 17" />
                  </svg>
                </div>
                <span>© {new Date().getFullYear()} PowderPredictor</span>
              </div>

              <p className="text-slate-600 max-w-sm text-center">
                Scores, best windows, and lift risk are for informational purposes only.
              </p>

              <div className="flex items-center gap-4">
                <a className="hover:text-slate-300 transition-colors" href="#how">Method</a>
                <a className="hover:text-slate-300 transition-colors" href="#features">Roadmap</a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}