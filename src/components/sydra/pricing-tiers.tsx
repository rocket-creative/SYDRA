import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import {
  dataTableBodyRow,
  dataTableClass,
  dataTableHeadRow,
  dataTableTd,
  dataTableTh,
} from "@/components/ui/data-table";
import { Section } from "@/components/ui/section";
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
  CASE_REVIEW_CTA,
  CALL_CTA_LABEL,
  caseReviewUrl,
} from "@/lib/case-review";
import { textStyles } from "@/lib/typography";

type PricingTiersProps = {
  variant: "full" | "compact";
  headingLevel?: "h1" | "h2";
};

function ComparisonCellDisplay({ value }: { value: ComparisonCell }) {
  if (value === true) {
    return (
      <span className="text-brand" aria-label="Included">
        Yes
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="text-body/40" aria-label="Not included">
        —
      </span>
    );
  }
  return <span className="text-sm text-body">{value}</span>;
}

function TierBlock({
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
      className={`relative flex h-full flex-col border-t border-rule pt-8 ${isExternal ? "opacity-90" : ""}`}
      id={tier.id}
    >
      {isRecommended ? (
        <p
          className={`type-caption absolute top-0 left-0 -translate-y-1/2 pr-3 text-[var(--color-accent)] ${
            variant === "compact" ? "bg-[var(--color-neutral)]" : "bg-white"
          }`}
        >
          Recommended
        </p>
      ) : null}
      <div>
        <h3 className="text-xl font-normal text-brand">{tier.name}</h3>
        <p className="mt-2 type-note text-[var(--color-accent)]">{tier.tagline}</p>
        <p className="mt-4 type-body text-body">{tier.bestFor}</p>
      </div>

      <ul className="mt-6 flex min-h-0 flex-1 flex-col justify-between">
        {bullets.map((item) => (
          <li key={item} className="flex gap-3 type-body text-body">
            <span aria-hidden className="type-caption text-brand">
              —
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        {variant === "full" && tier.notIncluded ? (
          <p className="mb-4 text-sm text-body/70">{tier.notIncluded}</p>
        ) : null}
        {variant === "full" ? (
          <p
            aria-hidden={isExternal || undefined}
            className={`mb-6 text-sm font-medium text-brand ${isExternal ? "invisible" : ""}`}
          >
            {PRICING_QUALITATIVE_LINE}
          </p>
        ) : null}
        <div className="grid">
        {variant === "full" ? (
          isExternal ? (
            <Button href={caseReviewUrl()} showArrow variant="ghost">
              {CASE_REVIEW_CTA}
            </Button>
          ) : (
            <Button
              href={`/demo?tier=${tier.id}`}
              showArrow
              variant={isRecommended ? "solid" : "ghost"}
            >
              {CALL_CTA_LABEL}
            </Button>
          )
        ) : (
          <CtaLink
            href={isExternal ? caseReviewUrl() : `/pricing#${tier.id}`}
          >
            {isExternal ? CASE_REVIEW_CTA : "Learn more"}
          </CtaLink>
        )}
        </div>
      </div>
    </article>
  );
}

function ComparisonTable() {
  return (
    <div className="mt-16 border-t border-rule pt-12">
      <h3 className={textStyles.subsectionTitle}>Compare plans</h3>

      {/* Mobile: stacked rows so a four column table never forces overflow at 360. */}
      <div className="mt-8 space-y-4 md:hidden">
        {TIER_COMPARISON.map((row) => (
          <div className="border border-rule p-5" key={row.feature}>
            <p className="type-caption uppercase tracking-[0.08em] text-body/70">{row.feature}</p>
            <dl className="mt-3 space-y-3">
              <div>
                <dt className="text-sm font-medium text-brand">Self Serve</dt>
                <dd className="mt-1 break-words text-sm text-body">
                  <ComparisonCellDisplay value={row.basic} />
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-[var(--color-accent)]">+ Support</dt>
                <dd className="mt-1 break-words text-sm text-body">
                  <ComparisonCellDisplay value={row.plus} />
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-brand">Full Service</dt>
                <dd className="mt-1 break-words text-sm text-body">
                  <ComparisonCellDisplay value={row.pro} />
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      {/* Desktop: full comparison table. */}
      <div className="mt-8 hidden md:block">
        <table className={dataTableClass}>
          <thead>
            <tr className={dataTableHeadRow}>
              <th className={dataTableTh} scope="col">
                Feature
              </th>
              <th className={dataTableTh} scope="col">
                Self Serve
              </th>
              <th className={`${dataTableTh} text-[var(--color-accent)]`} scope="col">
                + Support
              </th>
              <th className={dataTableTh} scope="col">
                Full Service
              </th>
            </tr>
          </thead>
          <tbody>
            {TIER_COMPARISON.map((row) => (
              <tr key={row.feature} className={dataTableBodyRow}>
                <td className={dataTableTd}>{row.feature}</td>
                <td className={dataTableTd}>
                  <ComparisonCellDisplay value={row.basic} />
                </td>
                <td className={dataTableTd}>
                  <ComparisonCellDisplay value={row.plus} />
                </td>
                <td className={dataTableTd}>
                  <ComparisonCellDisplay value={row.pro} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PricingTiers({ variant, headingLevel }: PricingTiersProps) {
  // Always a section heading under the page hero; default h2 for both variants.
  const HeadingTag = headingLevel ?? "h2";

  const inner = (
    <>
      <HeadingTag
        className="type-h2 prose-measure text-brand"
        id="heading-plans"
      >
        {PRICING_SECTION_HEADLINE}
      </HeadingTag>
      <p className="mt-6 max-w-2xl type-body text-body">{PRICING_SECTION_SUBHEAD}</p>
      {variant === "full" ? (
        <div className="mt-10 max-w-2xl border-t border-rule pt-8">
          <p className="font-medium text-brand">{TIER_ROUTING_HEADLINE}</p>
          <ul className="mt-4 space-y-2 type-body text-body">
            {TIER_ROUTING_LINES.map((line) => (
              <li key={line} className="flex gap-3">
                <span aria-hidden className="type-caption text-[var(--color-accent)]">
                  →
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
        {TIERS.map((tier) => (
          <TierBlock key={tier.id} tier={tier} variant={variant} />
        ))}
      </div>

      {variant === "full" ? (
        <>
          <ComparisonTable />
          <div className="mt-16 max-w-2xl border-t border-rule pt-10">
            <p className="text-lg font-normal text-brand">What you get on the demo</p>
            <p className="mt-3 type-body text-body">{DEMO_TRUST_BLOCK}</p>
            <div className="mt-8">
              <Button href="/demo" showArrow>
                {CALL_CTA_LABEL}
              </Button>
            </div>
          </div>
        </>
      ) : (
        <p className="mt-10">
          <CtaLink href="/pricing">See full pricing</CtaLink>
        </p>
      )}
    </>
  );

  if (variant === "compact") {
    return (
      <Section ariaLabelledby="heading-plans" id="plans" sidebarLabel="Pricing" tone="neutral">
        {inner}
      </Section>
    );
  }

  return <div>{inner}</div>;
}
