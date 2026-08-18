import Image from "next/image";

import { HERO, PROOF_CELLS, THESIS } from "@/lib/content/homepage";

/**
 * The hero, proof strip and thesis line share one vertical budget with the path
 * cards. Padding is tighter than the sitewide --space-section rhythm and the
 * thesis heading uses the compact type-h2 step rather than the larger home-h2.
 * The hero H1 gets its own home-hero-h1 step, sized to the headroom the fold
 * budget leaves once the cards, proof strip and thesis are placed.
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
 *
 * From md the hero is an 8/4 split, copy left and photo right. The photo is
 * absolutely positioned inside its column, so it contributes no intrinsic height
 * and the grid row is sized by the copy: the band stays 179px and the desktop
 * fold budget is unchanged. The 8 columns are also what keeps the H1 on one
 * line, which needs 752px at its 50px cap against 789px of column.
 */
export function Hero() {
  return (
    <section className={`bg-white pt-5 pb-4 lg:pt-3 ${BAND}`} id="hero">
      <div className={`${INNER} text-left`}>
        <div className="md:grid md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-8">
            <p className="home-eyebrow home-eyebrow-strong text-[var(--color-accent)]">
              {HERO.kicker}
            </p>
            <h1 className="home-hero-h1 mt-2 text-brand">{HERO.h1}</h1>
            <p className="home-lead mt-3 max-w-[54ch] text-balance text-body lg:mt-2">
              {HERO.subhead}
            </p>
          </div>
          {/*
           * Phones get a fixed shallow band under the copy rather than the
           * stretched column, so the headline still opens the page and the cards
           * stay as close to the first screen as the copy allows.
           */}
          <div className="hero-image-in relative mt-5 h-[clamp(7rem,20dvh,9rem)] overflow-hidden rounded-[2px] bg-surface-muted md:col-span-4 md:mt-0 md:h-auto">
            <Image
              alt="Surgeon reviewing a payer remittance in a hospital corridor"
              className="object-cover object-[55%_40%]"
              fill
              priority
              sizes="(min-width: 768px) 30vw, 100vw"
              src="/images/editorial/surgeon-payment-review.png"
            />
          </div>
        </div>
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
