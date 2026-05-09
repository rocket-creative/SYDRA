/** Decorative product mock for the hero. Markup only, no external images. */

export function SydraHeroMock() {
  return (
    <div
      aria-hidden
      className="relative mx-auto w-full max-w-[min(100%,520px)] lg:max-w-none"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-16 rounded-[45%] bg-[rgb(0,40,184)]/12 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-4 left-1/2 h-24 w-[90%] max-w-md -translate-x-1/2 rounded-[100%] bg-[rgb(2,27,81)]/12 blur-2xl"
      />

      <div className="relative [perspective:1600px]">
        <div
          className="motion-reduce:[transform:none] relative origin-center will-change-transform [transform-style:preserve-3d] [transform:rotateX(10deg)_rotateY(-18deg)_translateZ(0)] hover:[transform:rotateX(8deg)_rotateY(-14deg)_translateZ(12px)] md:[transform:rotateX(11deg)_rotateY(-20deg)] md:hover:[transform:rotateX(9deg)_rotateY(-16deg)_translateZ(8px)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Depth edge */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rounded-xl bg-[rgb(2,27,81)]/35 blur-sm [transform:translateZ(-24px)]"
          />

          <div className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)] ring-1 ring-slate-900/5">
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-slate-200/90 bg-[#F3F6FA] px-3 py-2.5">
              <div className="flex gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-[#FF6B6B]/90" />
                <span className="size-2.5 rounded-full bg-[#FFC84A]/90" />
                <span className="size-2.5 rounded-full bg-[#4CD964]/90" />
              </div>
              <div className="ml-2 min-w-0 flex-1 rounded-md border border-slate-200/80 bg-white px-2.5 py-1 text-[11px] text-slate-500 shadow-inner">
                <span className="font-medium text-[rgb(2,27,81)]">app.sydra.health</span>
                <span className="text-slate-400"> / drafts / submission packet</span>
              </div>
            </div>

            <div className="flex min-h-[260px] sm:min-h-[300px]">
              {/* Sidebar */}
              <aside
                className="hidden w-[30%] shrink-0 border-r border-[rgb(2,27,81)]/20 bg-[rgb(2,27,81)] px-2 py-3 text-[10px] leading-tight text-white/90 sm:block sm:px-3 sm:text-[11px]"
                aria-hidden
              >
                <p className="mb-3 font-semibold uppercase tracking-wider text-white/50">
                  Workspace
                </p>
                <ul className="space-y-2.5">
                  {[
                    "Inbound EOBs",
                    "Provider profile",
                    "Reference library",
                    "Draft queue",
                  ].map((item) => (
                    <li
                      key={item}
                      className={`rounded-md px-2 py-1.5 ${item === "Draft queue" ? "bg-white/15 font-medium text-white ring-1 ring-white/25" : "text-white/70"}`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-lg bg-[rgb(0,40,184)] p-2.5 text-center shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                  <p className="text-[9px] font-semibold uppercase tracking-wide text-white/90">
                    Next step
                  </p>
                  <p className="mt-1 text-[11px] font-bold text-white">
                    Review and export DOCX
                  </p>
                </div>
              </aside>

              {/* Main pane */}
              <div className="flex min-w-0 flex-1 flex-col border-l border-slate-100 bg-[#FAFBFD] p-3 sm:p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-500/25">
                    Draft ready
                  </span>
                  <span className="inline-flex items-center rounded-full bg-[rgb(1,126,255)]/10 px-2 py-0.5 text-[10px] font-medium text-[rgb(0,40,184)] ring-1 ring-[rgb(1,126,255)]/25">
                    No Surprises Act
                  </span>
                </div>
                <h3 className="mt-3 font-semibold leading-snug text-[rgb(2,27,81)] sm:text-[15px]">
                  CPT 27447 — IDR packet
                </h3>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-500 sm:text-[12px]">
                  Executive summary and market comparison are aligned to your op
                  notes and fee schedules.
                </p>

                {/* Fake document lines */}
                <div className="mt-4 space-y-2">
                  <div className="h-2 w-full max-w-[92%] rounded-full bg-slate-200/90" />
                  <div className="h-2 w-full max-w-[88%] rounded-full bg-slate-200/70" />
                  <div className="h-2 w-full max-w-[78%] rounded-full bg-slate-200/60" />
                  <div className="h-2 w-full max-w-[85%] rounded-full bg-slate-200/55" />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="rounded-lg border border-slate-200/80 bg-white p-2 shadow-sm">
                    <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                      Citations
                    </p>
                    <p className="mt-1 text-lg font-bold tabular-nums text-[rgb(2,27,81)]">
                      24
                    </p>
                    <p className="text-[10px] text-slate-500">prior wins</p>
                  </div>
                  <div className="rounded-lg border border-slate-200/80 bg-white p-2 shadow-sm">
                    <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                      Est. time saved
                    </p>
                    <p className="mt-1 text-lg font-bold tabular-nums text-[rgb(0,40,184)]">
                      2h 40m
                    </p>
                    <p className="text-[10px] text-slate-500">vs manual draft</p>
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <div className="mb-1.5 flex justify-between text-[10px] font-medium text-slate-500">
                    <span>Packet completeness</span>
                    <span className="text-[rgb(0,40,184)]">94%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-200/90">
                    <div
                      className="h-full w-[94%] rounded-full bg-[rgb(0,40,184)] shadow-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
