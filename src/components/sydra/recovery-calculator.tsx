"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

const WIN_RATE = 0.88;
const AWARD_MULTIPLIER = 4.5;

export function RecoveryCalculator() {
  const [claimsPerMonth, setClaimsPerMonth] = useState(20);
  const [avgDisputedAmount, setAvgDisputedAmount] = useState(15000);

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

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-[#1A2B48]" htmlFor="calc-claims">
            IDR eligible claims per month
          </label>
          <input
            className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-[#1A2B48] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            id="calc-claims"
            max={100}
            min={1}
            onChange={(e) => setClaimsPerMonth(Number(e.target.value))}
            type="number"
            value={claimsPerMonth}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1A2B48]" htmlFor="calc-amount">
            Average disputed amount per claim ($)
          </label>
          <input
            className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-[#1A2B48] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            id="calc-amount"
            max={500000}
            min={1000}
            step={500}
            onChange={(e) => setAvgDisputedAmount(Number(e.target.value))}
            type="number"
            value={avgDisputedAmount}
          />
        </div>
      </div>

      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-slate-50 p-4">
          <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Est. monthly recovery
          </dt>
          <dd className="mt-1 text-2xl font-semibold text-[#1A2B48]">
            ${estimate.monthlyRecovery.toLocaleString()}
          </dd>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Est. annual recovery
          </dt>
          <dd className="mt-1 text-2xl font-semibold text-[#1A2B48]">
            ${estimate.annualRecovery.toLocaleString()}
          </dd>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            At 20% attorney fee
          </dt>
          <dd className="mt-1 text-2xl font-semibold text-[#1A2B48]">
            ${estimate.attorneyFees.toLocaleString()}/yr
          </dd>
        </div>
      </dl>

      <p className="mt-6 text-xs leading-relaxed text-slate-500">
        Uses CMS published win rates (88%) and Georgetown CHIR median award benchmarks.
        Not a Sydra performance claim.
      </p>

      <p className="mt-4">
        <Link
          className="text-sm font-semibold text-[rgb(0,40,184)] underline decoration-blue-200 underline-offset-4 hover:decoration-[rgb(0,40,184)]"
          href="/demo"
        >
          Schedule a demo to see your numbers on a real claim →
        </Link>
      </p>
    </div>
  );
}
