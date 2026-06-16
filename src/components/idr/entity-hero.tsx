import { textStyles } from "@/lib/typography";

type EntityHeroProps = {
  title: string;
  subtitle: string;
  lead: string;
  eyebrow?: string;
};

export function EntityHero({ title, subtitle, lead, eyebrow }: EntityHeroProps) {
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
    </header>
  );
}
