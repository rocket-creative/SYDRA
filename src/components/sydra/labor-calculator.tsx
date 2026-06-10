"use client";

import { useId, useMemo, useState } from "react";

import { CtaLink } from "@/components/ui/cta-link";

const SYDRA_MINUTES_PER_CLAIM = 5;

const CLAIMS_MIN = 1;
const CLAIMS_MAX = 100;
const MINUTES_MIN = 25;
const MINUTES_MAX = 40;
const RATE_MIN = 20;
const RATE_MAX = 90;

type LaborCalculatorProps = {
  variant?: "light" | "onDark";
  ctaHref?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
};

const usd = (n: number) => `$${Math.round(n).toLocaleString()}`;
const hrs = (n: number) => `${Math.round(n)} hrs`;

export function LaborCalculator({
  variant = "light",
  ctaHref = "/demo",
  ctaLabel = "Schedule a demo for your numbers",
  onCtaClick,
}: LaborCalculatorProps) {
  const [claimsPerMonth, setClaimsPerMonth] = useState(20);
  const [minutesPerClaim, setMinutesPerClaim] = useState(30);
  const [hourlyRate, setHourlyRate] = useState(35);
  const onDark = variant === "onDark";
  const claimsId = useId();
  const minutesId = useId();
  const rateId = useId();

  const estimate = useMemo(() => {
    const manualHoursMonth = (claimsPerMonth * minutesPerClaim) / 60;
    const sydraHoursMonth = (claimsPerMonth * SYDRA_MINUTES_PER_CLAIM) / 60;
    const hoursReclaimedMonth = manualHoursMonth - sydraHoursMonth;
    const annualLaborCost = manualHoursMonth * hourlyRate * 12;
    return {
      manualHoursMonth,
      sydraHoursMonth,
      hoursReclaimedMonth,
      annualLaborCost: Math.round(annualLaborCost),
    };
  }, [claimsPerMonth, minutesPerClaim, hourlyRate]);

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
            <label className={`type-caption ${labelClass}`} htmlFor={minutesId}>
              Minutes to build one submission by hand
            </label>
            <span className={`text-2xl font-light tabular-nums leading-none ${valueClass}`}>
              {minutesPerClaim}
            </span>
          </div>
          <input
            className={`mt-3 h-6 w-full cursor-pointer ${sliderClass}`}
            id={minutesId}
            max={MINUTES_MAX}
            min={MINUTES_MIN}
            onChange={(e) => setMinutesPerClaim(Number(e.target.value))}
            type="range"
            value={minutesPerClaim}
          />
          <div className={`mt-2 flex justify-between text-xs ${mutedClass}`}>
            <span>{MINUTES_MIN} min</span>
            <span>{MINUTES_MAX} min</span>
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label className={`type-caption ${labelClass}`} htmlFor={rateId}>
              Loaded hourly cost of billing staff
            </label>
            <span className={`text-2xl font-light tabular-nums leading-none ${valueClass}`}>
              {usd(hourlyRate)}
            </span>
          </div>
          <input
            className={`mt-3 h-6 w-full cursor-pointer ${sliderClass}`}
            id={rateId}
            max={RATE_MAX}
            min={RATE_MIN}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            type="range"
            value={hourlyRate}
          />
          <div className={`mt-2 flex justify-between text-xs ${mutedClass}`}>
            <span>{usd(RATE_MIN)}</span>
            <span>{usd(RATE_MAX)}</span>
          </div>
        </div>

        <p className={`text-xs leading-relaxed ${mutedClass}`}>
          Manual build time of 25 to 40 minutes per submission is the Sydra documented range. Sydra
          prepares a standard single CPT claim in about five minutes. Your hourly rate and volume
          are your own inputs.
        </p>
      </div>

      <div className={`flex flex-col justify-center rounded-[2px] p-6 sm:p-8 ${panelClass}`}>
        <p className={`type-caption ${labelClass}`}>Annual cost of building submissions by hand</p>
        <p
          className={`mt-3 break-words font-light leading-none tracking-[-0.03em] tabular-nums ${valueClass}`}
          style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
        >
          {usd(estimate.annualLaborCost)}
        </p>

        <div className={`mt-8 grid grid-cols-2 gap-4 border-t sm:gap-6 ${trackClass} pt-6`}>
          <div className="min-w-0">
            <p className={`type-caption ${labelClass}`}>By hand, per month</p>
            <p className={`mt-2 break-words text-lg font-light tabular-nums sm:text-xl ${valueClass}`}>
              {hrs(estimate.manualHoursMonth)}
            </p>
          </div>
          <div className="min-w-0">
            <p className={`type-caption ${labelClass}`}>Capacity reclaimed per month</p>
            <p className={`mt-2 break-words text-lg font-light tabular-nums sm:text-xl ${valueClass}`}>
              {hrs(estimate.hoursReclaimedMonth)}
            </p>
            <p className={`mt-1 text-xs ${mutedClass}`}>The same team files more.</p>
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
