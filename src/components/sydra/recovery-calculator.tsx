"use client";

import { useMemo, useState } from "react";

import { CtaLink } from "@/components/ui/cta-link";
import { editorialInputClass, FormField } from "@/components/ui/form-field";

const WIN_RATE = 0.88;
const AWARD_MULTIPLIER = 4.5;

type RecoveryCalculatorProps = {
  variant?: "light" | "onDark";
};

export function RecoveryCalculator({ variant = "light" }: RecoveryCalculatorProps) {
  const [claimsPerMonth, setClaimsPerMonth] = useState(20);
  const [avgDisputedAmount, setAvgDisputedAmount] = useState(15000);
  const onDark = variant === "onDark";

  const estimate = useMemo(() => {
    const monthlyRecovery =
      claimsPerMonth * avgDisputedAmount * WIN_RATE * AWARD_MULTIPLIER;
    const annualRecovery = monthlyRecovery * 12;
    const attorneyFees = annualRecovery * 0.2;
    return {
      monthlyRecovery: Math.round(monthlyRecovery),
      annualRecovery: Math.round(annualRecovery),
      attorneyFees: Math.round(attorneyFees),
    };
  }, [claimsPerMonth, avgDisputedAmount]);

  const labelClass = onDark ? "text-white/70" : "text-brand";
  const valueClass = onDark ? "text-white" : "text-brand";
  const mutedClass = onDark ? "text-white/55" : "text-body";
  const inputClass = onDark
    ? `${editorialInputClass} border-white/25 text-white placeholder:text-white/40 focus:border-white`
    : editorialInputClass;

  return (
    <div>
      <div className="grid gap-8 md:grid-cols-2">
        <FormField id="calc-claims" label="IDR eligible claims per month">
          <input
            className={inputClass}
            id="calc-claims"
            max={100}
            min={1}
            onChange={(e) => setClaimsPerMonth(Number(e.target.value))}
            type="number"
            value={claimsPerMonth}
          />
        </FormField>
        <FormField id="calc-amount" label="Average disputed amount per claim ($)">
          <input
            className={inputClass}
            id="calc-amount"
            max={500000}
            min={1000}
            step={500}
            onChange={(e) => setAvgDisputedAmount(Number(e.target.value))}
            type="number"
            value={avgDisputedAmount}
          />
        </FormField>
      </div>

      <dl className="mt-10 grid gap-10 sm:grid-cols-3">
        {[
          { label: "Est. monthly recovery", value: estimate.monthlyRecovery },
          { label: "Est. annual recovery", value: estimate.annualRecovery },
          { label: "At 20% attorney fee", value: estimate.attorneyFees, suffix: "/yr" },
        ].map((row) => (
          <div key={row.label} className="min-w-0">
            <div className={`border-t ${onDark ? "border-white/20" : "border-rule"} pt-4`} aria-hidden />
            <dt className={`type-caption mt-4 ${labelClass}`}>{row.label}</dt>
            <dd
              className={`mt-2 font-light leading-none tracking-[-0.03em] ${valueClass}`}
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
            >
              ${row.value.toLocaleString()}
              {row.suffix ?? ""}
            </dd>
          </div>
        ))}
      </dl>

      <p className={`mt-8 text-xs leading-relaxed ${mutedClass}`}>
        Uses CMS published win rates (88%) and Georgetown CHIR median award benchmarks. Not a
        Sydra performance claim.
      </p>

      <p className="mt-6">
        <CtaLink
          className={onDark ? "!text-white hover:!text-white/80" : ""}
          href="/demo"
        >
          Schedule a demo for your numbers
        </CtaLink>
      </p>
    </div>
  );
}
