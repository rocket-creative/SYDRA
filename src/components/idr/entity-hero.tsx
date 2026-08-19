import { Button } from "@/components/ui/button";
import { EditorialImage } from "@/components/ui/editorial-image";
import { EDITORIAL, type EditorialAsset } from "@/lib/images";
import { textStyles } from "@/lib/typography";

type EntityHeroProps = {
  title: string;
  subtitle?: string;
  lead: string | readonly string[];
  eyebrow?: string;
  /** Pass null when the page renders its own hero photo below this block. */
  image?: EditorialAsset | null;
  /** Optional top-of-page CTA rendered below the lead. */
  ctaHref?: string;
  ctaLabel?: string;
};

export function EntityHero({
  title,
  subtitle,
  lead,
  eyebrow,
  image = EDITORIAL.surgeonCorridorWalk,
  ctaHref,
  ctaLabel,
}: EntityHeroProps) {
  const leads = typeof lead === "string" ? [lead] : lead;

  return (
    <>
      <header className="prose-measure" data-entity-hero>
        {eyebrow ? (
          <p className="type-caption mb-4 uppercase tracking-[0.12em] text-body/70">
            {eyebrow}
          </p>
        ) : null}
        <h1 className={textStyles.pageTitle}>
          {title}
          {subtitle ? <span className={textStyles.pageSubtitle}>{subtitle}</span> : null}
        </h1>
        {leads.map((paragraph, index) => (
          <p
            className={index === 0 ? textStyles.pageLead : `${textStyles.body} mt-4`}
            key={paragraph.slice(0, 48)}
          >
            {paragraph}
          </p>
        ))}
        {ctaHref && ctaLabel ? (
          <div className="mt-8">
            <Button href={ctaHref} showArrow>
              {ctaLabel}
            </Button>
          </div>
        ) : null}
      </header>
      {image ? (
        <EditorialImage
          aspect="3/2"
          asset={image}
          className="mt-10"
          focus="upper"
          sizes="(max-width: 1024px) 100vw, 1200px"
        />
      ) : null}
    </>
  );
}
