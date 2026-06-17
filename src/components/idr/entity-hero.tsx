import { Button } from "@/components/ui/button";
import { textStyles } from "@/lib/typography";

type EntityHeroProps = {
  title: string;
  subtitle: string;
  lead: string;
  eyebrow?: string;
  /** Optional top-of-page CTA rendered below the lead. */
  ctaHref?: string;
  ctaLabel?: string;
};

export function EntityHero({
  title,
  subtitle,
  lead,
  eyebrow,
  ctaHref,
  ctaLabel,
}: EntityHeroProps) {
  return (
    <header className="prose-measure">
      {eyebrow ? (
        <p className="type-caption mb-4 uppercase tracking-[0.12em] text-body/70">
          {eyebrow}
        </p>
      ) : null}
      <h1 className={textStyles.pageTitle}>
        {title}
        <span className={textStyles.pageSubtitle}>{subtitle}</span>
      </h1>
      <p className={textStyles.pageLead}>{lead}</p>
      {ctaHref && ctaLabel ? (
        <div className="mt-8">
          <Button href={ctaHref} showArrow>
            {ctaLabel}
          </Button>
        </div>
      ) : null}
    </header>
  );
}
