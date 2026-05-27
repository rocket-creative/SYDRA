import Link from "next/link";

import {
  DEMO_TRUST_BLOCK,
  PRICING_QUALITATIVE_LINE,
  PRICING_SECTION_HEADLINE,
  PRICING_SECTION_SUBHEAD,
  TIER_COMPARISON,
  TIER_ROUTING_HEADLINE,
  TIER_ROUTING_LINES,
  TIERS,
  type ComparisonCell,
  type TierDefinition,
} from "@/lib/content/tiers";
import {
  KRONOS_FULL_SERVICE_CTA,
  kronosCaseReviewUrl,
} from "@/lib/kronos-revenue";

type PricingTiersProps = {
  variant: "full" | "compact";
  /** Use h2 when embedded on the homepage (hero keeps the page h1). */
  headingLevel?: "h1" | "h2";
};

function ComparisonCellDisplay({ value }: { value: ComparisonCell }) {
  if (value === true) {
    return (
      <span className="inline-flex size-6 items-center justify-center text-emerald-600" aria-label="Included">
        ✓
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="text-slate-300" aria-label="Not included">
        —
      </span>
    );
  }
  return <span className="text-sm text-[#4A5568]">{value}</span>;
}

function TierCard({
  tier,
  variant,
}: {
  tier: TierDefinition;
  variant: "full" | "compact";
}) {
  const bullets = variant === "full" ? tier.inclusions : tier.compactInclusions;
  const isRecommended = tier.recommended === true;
  const isExternal = tier.externalOnly === true;

  return (
    <article
      className={`relative flex h-full flex-col rounded-xl border bg-white p-6 md:p-8 ${
        isExternal
          ? "border-slate-200 bg-slate-50/60 opacity-90"
          : isRecommended
            ? "border-[rgb(0,40,184)] ring-2 ring-[rgb(0,40,184)]/30"
            : "border-slate-200"
      }`}
      id={tier.id}
    >
      {isRecommended ? (
        <span className="absolute -top-3 left-6 rounded-md bg-[rgb(0,40,184)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
          Recommended
        </span>
      ) : null}

      <h3 className="text-xl font-semibold text-[#1A2B48]">{tier.name}</h3>
      <p className="mt-2 text-sm font-medium text-[rgb(0,40,184)]">{tier.tagline}</p>
      <p className="mt-4 text-[15px] leading-relaxed text-[#4A5568]">{tier.bestFor}</p>

      <ul className="mt-6 flex-1 space-y-3">
        {bullets.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-slate-700">
            <span
              className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded bg-blue-600/15 text-[11px] font-bold text-blue-700"
              aria-hidden
            >
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>

      {variant === "full" && tier.notIncluded ? (
        <p className="mt-4 text-sm text-slate-500">{tier.notIncluded}</p>
      ) : null}

      {variant === "full" && !isExternal ? (
        <p className="mt-6 text-sm font-medium text-[#1A2B48]">{PRICING_QUALITATIVE_LINE}</p>
      ) : null}

      <div className={`mt-6 flex flex-col gap-3 ${variant === "full" ? "" : ""}`}>
        {variant === "full" ? (
          isExternal ? (
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#1A2B48] transition duration-300 ease-out hover:bg-slate-50 active:scale-[0.98]"
              href={kronosCaseReviewUrl()}
              rel="noopener noreferrer"
              target="_blank"
            >
              {KRONOS_FULL_SERVICE_CTA} →
            </a>
          ) : (
            <Link
              className={`inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2.5 text-center text-sm font-semibold transition duration-300 ease-out active:scale-[0.98] ${
                isRecommended
                  ? "bg-[#1A2B48] text-white shadow-sm hover:opacity-90"
                  : "border border-slate-200 bg-white text-[#1A2B48] hover:bg-slate-50"
              }`}
              href={`/demo?tier=${tier.id}`}
            >
              Schedule a demo
            </Link>
          )
        ) : (
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#1A2B48] transition duration-300 ease-out hover:bg-slate-50 active:scale-[0.98]"
            href={isExternal ? kronosCaseReviewUrl() : `/plans#${tier.id}`}
            {...(isExternal ? { rel: "noopener noreferrer", target: "_blank" } : {})}
          >
            {isExternal ? KRONOS_FULL_SERVICE_CTA : "Learn more"}
          </Link>
        )}
      </div>
    </article>
  );
}

function ComparisonTable() {
  return (
    <div className="mt-16 overflow-x-auto">
      <h3 className="text-center text-lg font-semibold text-[#1A2B48] md:text-xl">
        Compare plans
      </h3>
      <table className="mt-8 w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="pb-4 pr-4 font-semibold text-[#1A2B48]" scope="col">
              Feature
            </th>
            <th className="pb-4 px-4 text-center font-semibold text-[#1A2B48]" scope="col">
              Self-Serve
            </th>
            <th className="pb-4 px-4 text-center font-semibold text-[rgb(0,40,184)]" scope="col">
              + Support
            </th>
            <th className="pb-4 pl-4 text-center font-semibold text-[#1A2B48]" scope="col">
              Full-Service
            </th>
          </tr>
        </thead>
        <tbody>
          {TIER_COMPARISON.map((row) => (
            <tr key={row.feature} className="border-b border-slate-100">
              <td className="py-4 pr-4 text-[15px] text-[#4A5568]">{row.feature}</td>
              <td className="py-4 px-4 text-center">
                <ComparisonCellDisplay value={row.basic} />
              </td>
              <td className="py-4 px-4 text-center">
                <ComparisonCellDisplay value={row.plus} />
              </td>
              <td className="py-4 pl-4 text-center">
                <ComparisonCellDisplay value={row.pro} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PricingTiers({ variant, headingLevel }: PricingTiersProps) {
  const HeadingTag =
    headingLevel ?? (variant === "full" ? "h1" : "h2");

  return (
    <div>
      <div className="text-center">
        <HeadingTag
          className="text-[1.55rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl md:text-[2rem]"
          id={variant === "compact" ? "heading-pricing" : "heading-plans"}
        >
          {PRICING_SECTION_HEADLINE}
        </HeadingTag>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#4A5568] md:text-[17px]">
          {PRICING_SECTION_SUBHEAD}
        </p>
        {variant === "full" ? (
          <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-slate-200 bg-slate-50 px-6 py-6 text-left md:px-8">
            <p className="text-[15px] font-semibold text-[#1A2B48]">{TIER_ROUTING_HEADLINE}</p>
            <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-[#4A5568]">
              {TIER_ROUTING_LINES.map((line) => (
                <li key={line} className="flex gap-2">
                  <span aria-hidden className="text-[rgb(0,40,184)]">
                    →
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-6 xl:gap-8">
        {TIERS.map((tier) => (
          <TierCard key={tier.id} tier={tier} variant={variant} />
        ))}
      </div>

      {variant === "full" ? (
        <>
          <ComparisonTable />
          <div className="mt-16 rounded-xl border border-slate-200 bg-slate-50 px-6 py-10 md:px-10">
            <p className="text-lg font-semibold text-[#1A2B48]">What you get on the demo</p>
            <p className="mt-3 text-[15px] leading-relaxed text-[#4A5568]">{DEMO_TRUST_BLOCK}</p>
            <Link
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-md bg-[#1A2B48] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              href="/demo"
            >
              Schedule a demo
            </Link>
          </div>
        </>
      ) : (
        <p className="mt-10 text-center">
          <Link
            className="text-sm font-semibold text-[rgb(0,40,184)] underline decoration-blue-200 underline-offset-4 transition hover:decoration-[rgb(0,40,184)]"
            href="/#plans"
          >
            See full pricing
          </Link>
        </p>
      )}
    </div>
  );
}
