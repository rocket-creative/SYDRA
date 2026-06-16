"use client";

import { useId, useMemo, useState } from "react";

import { CtaLink } from "@/components/ui/cta-link";

const WIN_RATE = 0.88;
const AWARD_MULTIPLIER = 4.5;

const CLAIMS_MIN = 1;
const CLAIMS_MAX = 100;
const AMOUNT_MIN = 1000;
const AMOUNT_MAX = 200000;
const AMOUNT_STEP = 1000;

type RecoveryCalculatorProps = {
  variant?: "light" | "onDark";
  ctaHref?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  /** Optional prefill, e.g. from an entity page's benchmark data. */
  defaultClaimsPerMonth?: number;
  defaultAvgDisputedAmount?: number;
};

const usd = (n: number) => `$${Math.round(n).toLocaleString()}`;

function clampInitial(value: number, min: number, max: number, step: number): number {
  const stepped = Math.round(value / step) * step;
  return Math.min(max, Math.max(min, stepped));
}

export function RecoveryCalculator({
  variant = "light",
  ctaHref = "/demo",
  ctaLabel = "Schedule a demo for your numbers",
  onCtaClick,
  defaultClaimsPerMonth = 20,
  defaultAvgDisputedAmount = 15000,
}: RecoveryCalculatorProps) {
  const [claimsPerMonth, setClaimsPerMonth] = useState(
    clampInitial(defaultClaimsPerMonth, CLAIMS_MIN, CLAIMS_MAX, 1),
  );
  const [avgDisputedAmount, setAvgDisputedAmount] = useState(
    clampInitial(defaultAvgDisputedAmount, AMOUNT_MIN, AMOUNT_MAX, AMOUNT_STEP),
  );
  const onDark = variant === "onDark";
  const claimsId = useId();
  const amountId = useId();

  const estimate = useMemo(() => {
    const monthlyRecovery = claimsPerMonth * avgDisputedAmount * WIN_RATE * AWARD_MULTIPLIER;
    const annualRecovery = monthlyRecovery * 12;
    const attorneyFees = annualRecovery * 0.2;
    return {
      monthlyRecovery: Math.round(monthlyRecovery),
      annualRecovery: Math.round(annualRecovery),
      attorneyFees: Math.round(attorneyFees),
    };
  }, [claimsPerMonth, avgDisputedAmount]);

  const labelClass = onDark ? "text-white/70" : "text-body";
  const valueClass = onDark ? "text-white" : "text-brand";
  const mutedClass = onDark ? "text-white/55" : "text-body/70";
  const trackClass = onDark ? "border-white/20" : "border-rule";
  const sliderClass = onDark ? "accent-white" : "accent-[var(--color-accent)]";
  const panelClass = onDark
    ? "border border-white/15 bg-white/5"
    : "border border-rule bg-neutral-section";

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Controls */}
      <div className="space-y-10">
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label className={`type-caption ${labelClass}`} htmlFor={claimsId}>
              IDR eligible claims per month
            </label>
            <span className={`text-2xl font-light tabular-nums leading-none ${valueClass}`}>
              {claimsPerMonth}
            </span>
          </div>
          <input
            className={`mt-3 h-6 w-full cursor-pointer ${sliderClass}`}
            id={claimsId}
            max={CLAIMS_MAX}
            min={CLAIMS_MIN}
            onChange={(e) => setClaimsPerMonth(Number(e.target.value))}
            type="range"
            value={claimsPerMonth}
          />
          <div className={`mt-2 flex justify-between text-xs ${mutedClass}`}>
            <span>{CLAIMS_MIN}</span>
            <span>{CLAIMS_MAX}+</span>
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label className={`type-caption ${labelClass}`} htmlFor={amountId}>
              Average disputed amount per claim
            </label>
            <span className={`text-2xl font-light tabular-nums leading-none ${valueClass}`}>
              {usd(avgDisputedAmount)}
            </span>
          </div>
          <input
            className={`mt-3 h-6 w-full cursor-pointer ${sliderClass}`}
            id={amountId}
            max={AMOUNT_MAX}
            min={AMOUNT_MIN}
            onChange={(e) => setAvgDisputedAmount(Number(e.target.value))}
            step={AMOUNT_STEP}
            type="range"
            value={avgDisputedAmount}
          />
          <div className={`mt-2 flex justify-between text-xs ${mutedClass}`}>
            <span>{usd(AMOUNT_MIN)}</span>
            <span>{usd(AMOUNT_MAX)}+</span>
          </div>
        </div>

        <p className={`text-xs leading-relaxed ${mutedClass}`}>
          Uses CMS published win rates (88%) and Georgetown CHIR median award benchmarks. Not a
          Sydra performance claim.
        </p>
      </div>

      {/* Result */}
      <div className={`flex flex-col justify-center rounded-[2px] p-6 sm:p-8 ${panelClass}`}>
        <p className={`type-caption ${labelClass}`}>Estimated annual recovery</p>
        <p
          className={`mt-3 break-words font-light leading-none tracking-[-0.03em] tabular-nums ${valueClass}`}
          style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
        >
          {usd(estimate.annualRecovery)}
        </p>

        <div className={`mt-8 grid grid-cols-2 gap-4 border-t sm:gap-6 ${trackClass} pt-6`}>
          <div className="min-w-0">
            <p className={`type-caption ${labelClass}`}>Per month</p>
            <p className={`mt-2 break-words text-lg font-light tabular-nums sm:text-xl ${valueClass}`}>
              {usd(estimate.monthlyRecovery)}
            </p>
          </div>
          <div className="min-w-0">
            <p className={`type-caption ${labelClass}`}>A 20% attorney would take</p>
            <p className={`mt-2 break-words text-lg font-light tabular-nums sm:text-xl ${valueClass}`}>
              {usd(estimate.attorneyFees)}
              <span className={`text-sm ${mutedClass}`}>/yr</span>
            </p>
            <p className={`mt-1 text-xs ${mutedClass}`}>You keep it with Sydra.</p>
          </div>
        </div>

        <p className="mt-8">
          <CtaLink
            className={onDark ? "!text-white hover:!text-white/80" : ""}
            href={ctaHref}
            onClick={onCtaClick}
          >
            {ctaLabel}
          </CtaLink>
        </p>
      </div>
    </div>
  );
}
