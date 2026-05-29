/** Decorative product UI screenshots (markup only, no external images). */

import type { ReactNode } from "react";

function ScreenFrame({ path, children }: { path: string; children: ReactNode }) {
  return (
    <div
      aria-hidden
      className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-rule bg-white shadow-[0_12px_28px_-14px_rgba(0,0,0,0.18)] ring-1 ring-black/5"
    >
      <div className="flex items-center gap-2 border-b border-rule bg-neutral-section px-2.5 py-1.5">
        <div className="flex gap-1" aria-hidden>
          <span className="size-2 rounded-full bg-[#FF6B6B]/90" />
          <span className="size-2 rounded-full bg-[#FFC84A]/90" />
          <span className="size-2 rounded-full bg-[#4CD964]/90" />
        </div>
        <div className="ml-1 min-w-0 flex-1 truncate rounded border border-rule bg-white px-2 py-0.5 text-[9px] text-body/70">
          <span className="font-medium text-brand">app.sydra.health</span>
          <span className="text-body/50">{path}</span>
        </div>
      </div>
      <div className="relative flex h-[calc(100%-1.75rem)] flex-col bg-neutral-section p-2.5">
        {children}
      </div>
    </div>
  );
}

function Check() {
  return (
    <span
      aria-hidden
      className="flex size-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[8px] font-bold text-emerald-700 ring-1 ring-emerald-500/30"
    >
      &#10003;
    </span>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[8px] font-semibold uppercase tracking-wider text-body/55">{children}</p>
  );
}

/** Step 1 — EOB upload and automated eligibility check. */
export function ScreenEligibility() {
  const checks = [
    "NSA eligible",
    "Plan type covered",
    "Cooling-off period clear",
    "Open negotiation initiated",
  ];
  return (
    <ScreenFrame path=" / intake / eligibility">
      <Eyebrow>Step 1 · Eligibility</Eyebrow>
      <div className="mt-1.5 flex items-center gap-2 rounded-md border border-dashed border-[var(--color-accent)]/40 bg-white px-2 py-1.5">
        <span className="flex size-5 items-center justify-center rounded bg-[var(--color-accent)]/10 text-[9px] font-bold text-[var(--color-accent)]">
          PDF
        </span>
        <div className="min-w-0">
          <p className="truncate text-[10px] font-medium text-brand">EOB_27447.pdf</p>
          <p className="text-[8px] text-body/60">Uploaded · 142 KB</p>
        </div>
        <span className="ml-auto text-[8px] font-semibold uppercase tracking-wide text-emerald-700">
          Parsed
        </span>
      </div>
      <ul className="mt-2 space-y-1.5">
        {checks.map((c) => (
          <li key={c} className="flex items-center gap-1.5 text-[10px] text-body">
            <Check />
            <span className="truncate">{c}</span>
          </li>
        ))}
      </ul>
    </ScreenFrame>
  );
}

/** Step 2 — AI drafts the submission packet section by section. */
export function ScreenDraftGeneration() {
  const sections = [
    { label: "Executive summary", done: true },
    { label: "Market rate justification", done: true },
    { label: "Clinical necessity narrative", done: true },
    { label: "Provider credentials", done: false },
  ];
  return (
    <ScreenFrame path=" / drafts / generating">
      <div className="flex items-center justify-between">
        <Eyebrow>Step 2 · Drafting</Eyebrow>
        <span className="text-[8px] font-medium text-[var(--color-accent)]">Claude on Bedrock</span>
      </div>
      <ul className="mt-2 space-y-1.5">
        {sections.map((s) => (
          <li key={s.label} className="flex items-center gap-1.5 text-[10px] text-body">
            {s.done ? (
              <Check />
            ) : (
              <span
                aria-hidden
                className="size-3.5 shrink-0 animate-pulse rounded-full border-2 border-[var(--color-accent)]/30 border-t-[var(--color-accent)]"
              />
            )}
            <span className="truncate">{s.label}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-2.5">
        <div className="mb-1 flex justify-between text-[8px] font-medium text-body/70">
          <span>Packet completeness</span>
          <span className="text-[var(--color-accent)]">75%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-rule">
          <div className="h-full w-[75%] rounded-full bg-[var(--color-accent)]" />
        </div>
      </div>
    </ScreenFrame>
  );
}

/** Step 3 — Completed draft with cited prior determinations. */
export function ScreenDraftReview() {
  return (
    <ScreenFrame path=" / drafts / CPT-27447">
      <div className="flex flex-wrap items-center gap-1.5">
        <Eyebrow>Step 3 · Review</Eyebrow>
        <span className="rounded-full bg-emerald-500/10 px-1.5 py-px text-[8px] font-semibold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-500/25">
          Draft ready
        </span>
      </div>
      <h3 className="mt-1.5 text-[11px] font-semibold leading-snug text-brand">
        CPT 27447 — market rate justification
      </h3>
      <div className="mt-1.5 space-y-1" aria-hidden>
        <div className="h-1.5 w-[94%] rounded-full bg-rule" />
        <div className="h-1.5 w-[88%] rounded-full bg-rule/80" />
        <div className="h-1.5 w-[72%] rounded-full bg-rule/70" />
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {["IDRE-2024-0612", "IDRE-2024-0517", "IDRE-2023-1184"].map((cite) => (
          <span
            key={cite}
            className="rounded border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/8 px-1.5 py-0.5 text-[8px] font-medium tabular-nums text-[var(--color-accent)]"
          >
            {cite}
          </span>
        ))}
      </div>
      <p className="mt-auto pt-2 text-[9px] text-body/70">
        <span className="font-bold text-brand">24 citations</span> · 90% provider wins, weighted to
        spine and orthopedic codes
      </p>
    </ScreenFrame>
  );
}

/** Step 4 — One-click DOCX export and guided portal checklist. */
export function ScreenExport() {
  const steps = ["Dispute details", "Provider offer", "Supporting documents", "Submit to IDRE"];
  return (
    <ScreenFrame path=" / drafts / export">
      <Eyebrow>Step 4 · Export & submit</Eyebrow>
      <div className="mt-1.5 flex items-center gap-2 rounded-md border border-rule bg-white px-2 py-1.5">
        <span className="flex size-5 items-center justify-center rounded bg-[#2B579A] text-[8px] font-bold text-white">
          W
        </span>
        <div className="min-w-0">
          <p className="truncate text-[10px] font-medium text-brand">IDR_packet_27447.docx</p>
          <p className="text-[8px] text-body/60">Submission ready</p>
        </div>
        <span className="ml-auto rounded bg-[var(--color-accent)] px-1.5 py-0.5 text-[8px] font-semibold text-white">
          Export
        </span>
      </div>
      <ul className="mt-2 space-y-1">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-1.5 text-[9px] text-body">
            {i < 3 ? (
              <Check />
            ) : (
              <span
                aria-hidden
                className="flex size-3.5 shrink-0 items-center justify-center rounded-full border border-[var(--color-accent)]/40 text-[7px] font-bold text-[var(--color-accent)]"
              >
                4
              </span>
            )}
            <span className="truncate">{s}</span>
          </li>
        ))}
      </ul>
    </ScreenFrame>
  );
}

export const PRODUCT_SCREENS = [
  ScreenEligibility,
  ScreenDraftGeneration,
  ScreenDraftReview,
  ScreenExport,
] as const;
