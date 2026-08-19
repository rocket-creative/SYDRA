import Image from "next/image";

import { HeroCtas } from "@/components/landing/hero-ctas";
import { FOUNDER_ORIGIN_LINE } from "@/lib/content/founder-lines";
import { HERO } from "@/lib/content/homepage";
import { EDITORIAL } from "@/lib/images";
import type { CampaignTracking } from "@/lib/landing/tracking";

type HeroProps = {
  stateDisplay: string | null;
  tracking: CampaignTracking;
};

function HeroContent({
  eyebrow,
}: {
  eyebrow: string;
}) {
  return (
    <div className="w-full">
      <div aria-hidden className="mb-5 h-px w-16 bg-[var(--color-accent)]" />
      <p className="home-eyebrow break-words text-body">{eyebrow}</p>
      {/*
       * Taken from HERO rather than restated. This page carried a longer second
       * wording of the same approved line, so the site said the one thing it
       * most wants to say in two different ways.
       */}
      <h1 className="home-h1 mt-4 min-w-0 text-balance text-brand" id="landing-hero-heading">
        {HERO.h1}
      </h1>
      <p className="home-lead mt-4 text-body md:mt-5">{HERO.subhead}</p>
      <HeroCtas />
      <figure className="mt-5 max-w-[720px] md:mt-6">
        <blockquote className="home-body text-body">{FOUNDER_ORIGIN_LINE}</blockquote>
        <figcaption className="home-caption mt-3 text-body">
          Dr. John Abrahams, MD, board certified neurosurgeon and founder
        </figcaption>
      </figure>
    </div>
  );
}

export function Hero({ stateDisplay }: HeroProps) {
  const eyebrow = stateDisplay
    ? `OUT OF NETWORK RECOVERY FOR SURGICAL PRACTICES · ${stateDisplay}`
    : "OUT OF NETWORK RECOVERY FOR SURGICAL PRACTICES";

  return (
    <section
      aria-labelledby="landing-hero-heading"
      className="relative flex flex-col overflow-hidden bg-white text-brand md:min-h-[clamp(34rem,70dvh,52rem)] md:bg-transparent"
    >
      <div className="relative h-[clamp(7.5rem,22dvh,10rem)] w-full shrink-0 md:absolute md:inset-0 md:h-auto md:min-h-full">
        <Image
          alt={EDITORIAL.seniorSurgeonWindow.alt}
          className="object-cover object-[center_25%] md:object-right"
          fill
          priority
          sizes="100vw"
          src={EDITORIAL.seniorSurgeonWindow.src}
        />
      </div>

      <div className="relative z-10 flex w-full flex-1 md:mt-auto md:items-end">
        <div className="mx-auto flex w-full max-w-[1200px] px-4 pb-6 pt-4 md:px-6 md:pb-14 md:pt-10 lg:px-8">
          <div className="hero-frost-panel w-full min-w-0 rounded-[2px] border border-rule/40 p-5 md:max-w-xl md:border-white/60 md:p-8 lg:max-w-2xl lg:p-10">
            <HeroContent eyebrow={eyebrow} />
          </div>
        </div>
      </div>
    </section>
  );
}
