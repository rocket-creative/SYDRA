import { HERO, PROOF_CELLS, THESIS } from "@/lib/content/homepage";

/**
 * The hero, proof strip and thesis line share one vertical budget with the path
 * cards. Padding is tighter than the sitewide --space-section rhythm and the
 * headings use the compact end of the existing type scale (type-h1, type-h2)
 * rather than the larger home-h1 / home-h2 steps.
 *
 * Base classes are the phone layout, sized for legibility: 14px body copy, 16px
 * card padding, 12px floor on the proof strip. The lg: overrides then compress
 * the block to clear 660px at 1440x760. The 390x760 budget in the spec is not
 * reachable with this copy, so phones are not squeezed to chase it.
 */
const BAND = "px-4 md:px-6 lg:px-8";
const INNER = "mx-auto w-full max-w-[1200px]";

/**
 * Kept deliberately short on phones. The four path cards below it are the page's
 * primary navigation, so the hero should not eat half the first screen.
 */
export function Hero() {
  return (
    <section className={`bg-white pt-5 pb-4 lg:pt-3 ${BAND}`} id="hero">
      <div className={`${INNER} text-left md:text-center`}>
        <p className="home-eyebrow text-[var(--color-accent)]">{HERO.kicker}</p>
        <h1 className="type-h1 mt-2 text-brand">{HERO.h1}</h1>
        <p className="home-lead mt-3 max-w-[54ch] text-balance text-body md:mx-auto lg:mt-2">
          {HERO.subhead}
        </p>
      </div>
    </section>
  );
}

/**
 * Three cells, equal width, 1px rules between them. Stays 3-across on phones by
 * scaling the type down instead of stacking.
 */
export function ProofStrip() {
  return (
    <section className={`bg-neutral-section py-5 lg:py-2.5 ${BAND}`} id="proof">
      <dl className={`${INNER} grid grid-cols-3 divide-x divide-[var(--color-rule)]`}>
        {PROOF_CELLS.map((cell) => (
          <div className="min-w-0 px-3 first:pl-0 last:pr-0 md:px-6" key={cell.value}>
            <dt className="text-[20px] font-medium leading-tight text-brand tabular-nums md:text-[24px]">
              {cell.value}
            </dt>
            {/*
             * Three across at 390px leaves ~110px a cell, so 12px is the practical
             * floor and it is also where the repo's mobile harness and the spec stop.
             */}
            <dd className="mt-1.5 text-[12px] leading-snug text-body md:text-[13px] lg:mt-1">
              {cell.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Thesis() {
  return (
    <section
      aria-labelledby="thesis-heading"
      className={`bg-white pt-7 pb-8 lg:pt-3 lg:pb-4 ${BAND}`}
      id="thesis"
    >
      <div className={`${INNER} md:text-center`}>
        <h2 className="type-h2 text-brand" id="thesis-heading">
          {THESIS.heading}
        </h2>
        <p className="home-body mt-3 max-w-[64ch] text-body md:mx-auto lg:mt-2">{THESIS.body}</p>
      </div>
    </section>
  );
}
