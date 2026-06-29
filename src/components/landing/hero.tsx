import Image from "next/image";

import { HeroCtas } from "@/components/landing/hero-ctas";
import { SplitHeadline } from "@/components/motion/split-headline";
import type { CampaignTracking } from "@/lib/landing/tracking";

type HeroProps = {
  stateDisplay: string | null;
  tracking: CampaignTracking;
};

function HeroContent({
  eyebrow,
  tracking,
}: {
  eyebrow: string;
  tracking: CampaignTracking;
}) {
  return (
    <div className="max-w-3xl">
      <div aria-hidden className="rule-draw mb-5 h-px w-16 bg-[var(--color-accent)]" />
      <p className="hero-eyebrow font-mono text-xs uppercase tracking-[0.14em] text-body md:text-[11px] md:text-body/70">
        {eyebrow}
      </p>
      <h1 className="type-display mt-4 text-brand" id="landing-hero-heading">
        <SplitHeadline text="Stop writing off out of network claims." />
      </h1>
      <p className="hero-sub prose-measure mt-5 type-body text-body">
        The No Surprises Act gets them paid through federal independent dispute resolution (IDR).
        Surgeon built NSA IDR software your billing team runs in five minutes per claim, turning
        written off out-of-network claims into recovered revenue.
      </p>
      <p className="hero-bold prose-measure mt-3 text-[15px] font-medium leading-relaxed text-brand md:text-[17px]">
        Your team reviews. Your team submits. You keep the recovery.
      </p>
      <HeroCtas tracking={tracking} />
    </div>
  );
}

export function Hero({ stateDisplay, tracking }: HeroProps) {
  const eyebrow = stateDisplay
    ? `OUT OF NETWORK RECOVERY FOR SURGICAL PRACTICES · ${stateDisplay}`
    : "OUT OF NETWORK RECOVERY FOR SURGICAL PRACTICES";

  return (
    <section
      aria-labelledby="landing-hero-heading"
      className="relative isolate flex flex-col overflow-hidden bg-white text-brand md:min-h-[clamp(34rem,70dvh,52rem)]"
    >
      {/* Mobile: short image band stacked above white copy block */}
      <div className="relative h-[clamp(8rem,24dvh,12rem)] w-full shrink-0 md:absolute md:inset-0 md:h-auto md:min-h-full">
        <Image
          alt="Surgical practice billing team preparing out-of-network claims for federal IDR"
          className="object-cover object-[center_20%] md:object-right"
          fill
          priority
          sizes="100vw"
          src="/images/editorial/postcard-hero-billing.png"
        />
      </div>

      {/* Desktop: lower-third frosted band over photo. Mobile: solid white block. */}
      <div className="relative z-10 w-full bg-white md:mt-auto md:bg-white/50 md:backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none">
        <div className="mx-auto w-full max-w-[1280px] px-5 pb-8 pt-6 md:px-10 md:pb-16 md:pt-8">
          <HeroContent eyebrow={eyebrow} tracking={tracking} />
        </div>
      </div>
    </section>
  );
}
