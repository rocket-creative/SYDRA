/** Decorative product UI for the hero (markup only, no external images). */

export function SydraHeroMock() {
  return (
    <div
      aria-hidden
      className="relative mx-auto w-full max-w-[min(100%,520px)] lg:max-w-none"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-16 rounded-[45%] bg-[var(--color-accent)]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-4 left-1/2 h-24 w-[90%] max-w-md -translate-x-1/2 rounded-[100%] bg-[var(--color-hero)]/10 blur-2xl"
      />

      <div className="relative [perspective:1600px]">
        <div
          className="motion-reduce:[transform:none] relative origin-center will-change-transform [transform-style:preserve-3d] [transform:rotateX(10deg)_rotateY(-18deg)_translateZ(0)] hover:[transform:rotateX(8deg)_rotateY(-14deg)_translateZ(12px)] md:[transform:rotateX(11deg)_rotateY(-20deg)] md:hover:[transform:rotateX(9deg)_rotateY(-16deg)_translateZ(8px)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rounded-xl bg-[var(--color-hero)]/25 blur-sm [transform:translateZ(-24px)]"
          />

          <div className="relative overflow-hidden rounded-xl border border-rule bg-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
            <div className="flex items-center gap-2 border-b border-rule bg-neutral-section px-3 py-2.5">
              <div className="flex gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-[#FF6B6B]/90" />
                <span className="size-2.5 rounded-full bg-[#FFC84A]/90" />
                <span className="size-2.5 rounded-full bg-[#4CD964]/90" />
              </div>
              <div className="ml-2 min-w-0 flex-1 rounded-md border border-rule bg-white px-2.5 py-1 text-[11px] text-body/80 shadow-inner">
                <span className="font-medium text-brand">app.sydra.health</span>
                <span className="text-body/50"> / drafts / submission packet</span>
              </div>
            </div>

            <div className="flex min-h-[260px] sm:min-h-[300px]">
              <aside
                className="hidden w-[30%] shrink-0 border-r border-white/15 bg-hero px-2 py-3 text-[10px] leading-tight text-white/90 sm:block sm:px-3 sm:text-[11px]"
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
                <div className="mt-6 rounded-lg bg-[var(--color-accent)] p-2.5 text-center shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                  <p className="text-[9px] font-semibold uppercase tracking-wide text-white/90">
                    Next step
                  </p>
                  <p className="mt-1 text-[11px] font-bold text-white">
                    Review and export DOCX
                  </p>
                </div>
              </aside>

              <div className="flex min-w-0 flex-1 flex-col border-l border-rule bg-neutral-section p-3 sm:p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-500/25">
                    Draft ready
                  </span>
                  <span className="inline-flex items-center rounded-full bg-[var(--color-accent)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--color-accent)] ring-1 ring-[var(--color-accent)]/25">
                    No Surprises Act
                  </span>
                </div>
                <h3 className="mt-3 font-semibold leading-snug text-brand sm:text-[15px]">
                  CPT 27447 — IDR packet
                </h3>
                <p className="mt-1 text-[11px] leading-relaxed text-body sm:text-[12px]">
                  Executive summary and market comparison are aligned to your op
                  notes and fee schedules.
                </p>

                <div className="mt-4 space-y-2" aria-hidden>
                  <div className="h-2 w-full max-w-[92%] rounded-full bg-rule" />
                  <div className="h-2 w-full max-w-[88%] rounded-full bg-rule/80" />
                  <div className="h-2 w-full max-w-[78%] rounded-full bg-rule/70" />
                  <div className="h-2 w-full max-w-[85%] rounded-full bg-rule/60" />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="rounded-lg border border-rule bg-white p-2 shadow-sm">
                    <p className="text-[9px] font-semibold uppercase tracking-wide text-body/60">
                      Citations
                    </p>
                    <p className="mt-1 text-lg font-bold tabular-nums text-brand">24</p>
                    <p className="text-[10px] text-body/80">prior wins</p>
                  </div>
                  <div className="rounded-lg border border-rule bg-white p-2 shadow-sm">
                    <p className="text-[9px] font-semibold uppercase tracking-wide text-body/60">
                      Est. time saved
                    </p>
                    <p className="mt-1 text-lg font-bold tabular-nums text-[var(--color-accent)]">
                      2h 40m
                    </p>
                    <p className="text-[10px] text-body/80">vs manual draft</p>
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <div className="mb-1.5 flex justify-between text-[10px] font-medium text-body/80">
                    <span>Packet completeness</span>
                    <span className="text-[var(--color-accent)]">94%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-rule">
                    <div className="h-full w-[94%] rounded-full bg-[var(--color-accent)]" />
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
