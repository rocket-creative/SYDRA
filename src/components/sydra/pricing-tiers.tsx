import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
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
      className={`flex h-full flex-col border-t border-rule pt-8 ${isExternal ? "opacity-90" : ""}`}
      id={tier.id}
    >
      {isRecommended ? (
        <p className="type-caption mb-3 text-[var(--color-accent)]">Recommended</p>
      ) : null}

      <h3 className="text-xl font-normal text-brand">{tier.name}</h3>
      <p className="mt-2 type-caption text-[var(--color-accent)]">{tier.tagline}</p>
      <p className="mt-4 type-body text-body">{tier.bestFor}</p>

      <ul className="mt-6 flex-1 space-y-3">
        {bullets.map((item) => (
          <li key={item} className="flex gap-3 type-body text-body">
            <span aria-hidden className="type-caption text-brand">
              —
            </span>
            {item}
          </li>
        ))}
      </ul>

      {variant === "full" && tier.notIncluded ? (
        <p className="mt-4 text-sm text-body/70">{tier.notIncluded}</p>
      ) : null}

      {variant === "full" && !isExternal ? (
        <p className="mt-6 text-sm font-medium text-brand">{PRICING_QUALITATIVE_LINE}</p>
      ) : null}

      <div className="mt-8">
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
              Request a 15-minute demo
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
      <div className="mt-8 hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-rule">
              <th className="pb-4 pr-4 font-normal text-brand" scope="col">
                Feature
              </th>
              <th className="pb-4 px-4 text-left font-normal text-brand" scope="col">
                Self Serve
              </th>
              <th className="pb-4 px-4 text-left font-normal text-[var(--color-accent)]" scope="col">
                + Support
              </th>
              <th className="pb-4 pl-4 text-left font-normal text-brand" scope="col">
                Full Service
              </th>
            </tr>
          </thead>
          <tbody>
            {TIER_COMPARISON.map((row) => (
              <tr key={row.feature} className="border-b border-rule">
                <td className="py-4 pr-4 text-[15px] text-body">{row.feature}</td>
                <td className="py-4 px-4">
                  <ComparisonCellDisplay value={row.basic} />
                </td>
                <td className="py-4 px-4">
                  <ComparisonCellDisplay value={row.plus} />
                </td>
                <td className="py-4 pl-4">
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
                Request a 15-minute demo
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
