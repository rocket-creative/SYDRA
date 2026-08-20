"use client";

import { track } from "@vercel/analytics";

import { Button } from "@/components/ui/button";
import { EditorialImage } from "@/components/ui/editorial-image";
import { CALL_PATH } from "@/lib/case-review";
import { CTA_BLOCK, HERO, PROOF_CELLS, THESIS } from "@/lib/content/homepage";
import { EDITORIAL } from "@/lib/images";

/**
 * Hero, proof strip and thesis line.
 *
 * The fold budget only covers the hero and the path cards now (spec 3). The
 * proof strip and the thesis sit just below it, which is what buys the hero
 * enough room for the CTAs and normal section rhythm. Before, all four bands
 * had to clear 660px and the hero paid for it: 12px of top padding, a 110px
 * letterbox photo, and no call to action above the fold at all.
 */
const BAND = "px-4 md:px-6 lg:px-8";
const INNER = "mx-auto w-full max-w-[1200px]";

/** Same destinations as the closing block, so the two CTA surfaces cannot drift. */
const CALCULATOR_HREF = "/idr-recovery-calculator";

/**
 * Asymmetric 7/5 split from lg: copy left at ~57% of the row, the stat panel
 * right. The split is deliberately not even, so the row still reads as a hero
 * rather than a feature section.
 *
 * It starts at lg, not md, because 7 of 12 columns at 820px leaves the copy
 * 430px and both CTA labels wrap to two lines in it. Tablets get the stacked
 * layout, which has the full 772px to place them side by side.
 *
 * The H1 breaks over two lines at the 50px desktop step. That is intended: the
 * copy column is 680px against the ~750px the line needs unbroken.
 */
export function Hero() {
  return (
    <section className={`bg-white pt-8 pb-8 md:pt-10 ${BAND}`} id="hero">
      <div className={INNER}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-x-12">
          <div className="lg:col-span-7">
            <p className="type-caption type-caption-strong text-[var(--color-accent)]">
              {HERO.kicker}
            </p>
            <h1 className="home-hero-h1 mt-3 text-balance text-brand">{HERO.h1}</h1>
            <p className="type-lead mt-4 max-w-[52ch] text-body">{HERO.subhead}</p>
            {/*
             * Two actions, two buyer stages: the demo for anyone ready to talk,
             * the calculator for anyone still sizing the problem. Both labels
             * and both destinations come from the closing CTA block.
             */}
            <div className="cta-row mt-6">
              <Button
                href={CALL_PATH}
                onClick={() => track("cta_click", { label: "cta_set_up_demo", placement: "homepage-hero" })}
                showArrow
                variant="solid"
              >
                {CTA_BLOCK.demo}
              </Button>
              <Button
                href={CALCULATOR_HREF}
                onClick={() => track("cta_click", { label: "cta_claim_worth", placement: "homepage-hero" })}
                variant="ghost"
              >
                {CTA_BLOCK.calculator}
              </Button>
            </div>
          </div>

          {/*
           * From lg the photo sets the row height rather than matching the copy
           * column, which is what makes the band taller than the copy alone
           * needs. Tablets need their own floor too: the stacked column is 772px
           * wide, and a 4:1 crop of a 16:9 source cuts the subject's head off.
           */}
          <div className="relative lg:col-span-5">
            <EditorialImage
              asset={EDITORIAL.surgeonPaymentReview}
              aspect="fill"
              className="md:min-h-[17rem] lg:min-h-[24rem]"
              eager
              focus="upper"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            {/*
             * Feathers the photo's left edge into the white band so it reads as
             * part of the spread rather than a rectangle parked beside the copy.
             * Only in the split: stacked, there is nothing to its left to fade
             * into. Fades to white/0 rather than transparent, which keeps the
             * ramp from picking up grey.
             */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-linear-to-r from-white to-white/0 lg:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Four cells: stacked on phones, 2x2 from md, one row with 1px rules between
 * them from lg. The dividers only apply to the single-row layout, because
 * divide-x on a wrapped grid draws a rule down the left of the second row's
 * first cell.
 */
export function ProofStrip() {
  return (
    <section className={`bg-neutral-section py-8 md:py-10 ${BAND}`} id="proof">
      <dl
        className={`${INNER} grid gap-6 md:grid-cols-2 md:gap-x-12 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-[var(--color-rule)]`}
      >
        {PROOF_CELLS.map((cell) => (
          <div className="min-w-0 lg:px-6 lg:first:pl-0 lg:last:pr-0" key={cell.value}>
            <dt className="text-[22px] font-medium leading-tight text-brand tabular-nums md:text-[26px]">
              {cell.value}
            </dt>
            <dd className="mt-2 text-[14px] leading-snug text-body md:text-[15px]">{cell.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/**
 * Copy left, photo right. The 5/7 split inverts the hero's 7/5 so the two bands
 * do not read as the same template stamped twice, and the photo carries the
 * width the short thesis copy cannot fill on its own.
 *
 * The image is below the fold, so it stays lazy rather than eager.
 */
export function Thesis() {
  return (
    <section
      aria-labelledby="thesis-heading"
      className={`bg-white py-14 md:py-20 ${BAND}`}
      id="thesis"
    >
      <div className={`${INNER} grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-x-12`}>
        <div className="lg:col-span-5">
          <h2 className="type-h2 text-brand" id="thesis-heading">
            {THESIS.heading}
          </h2>
          <p className="type-body mt-4 max-w-[46ch] text-body">{THESIS.body}</p>
        </div>
        <div className="lg:col-span-7">
          <EditorialImage
            asset={EDITORIAL.billerStandingDesk}
            aspect="16/9"
            sizes="(min-width: 1024px) 56vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
