import Image from "next/image";

import { HeroCtas } from "@/components/landing/hero-ctas";
import { HeroProofStack } from "@/components/landing/hero-proof-stack";
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
    <div className="w-full">
      <div aria-hidden className="rule-draw mb-5 h-px w-16 bg-[var(--color-accent)]" />
      <p className="hero-eyebrow font-mono text-xs uppercase tracking-[0.14em] text-body md:text-[11px] md:text-body/70">
        {eyebrow}
      </p>
      <h1 className="type-display mt-4 text-brand" id="landing-hero-heading">
        <SplitHeadline text="Stop writing off out of network claims." />
      </h1>
      <p className="hero-sub mt-5 type-body text-body">
        Your billing team recovers underpaid out of network claims in five minutes per claim, and
        you keep every dollar. No attorney, no 20% cut. Built by a surgeon who files these claims
        himself.
      </p>
      <HeroCtas tracking={tracking} />
      <HeroProofStack className="mt-8 border-t border-rule pt-8" />
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
      className="relative flex flex-col overflow-hidden bg-white text-brand md:min-h-[clamp(34rem,70dvh,52rem)] md:bg-transparent"
    >
      {/* Mobile: short image band. Desktop: full bleed, weighted right so faces stay clear. */}
      <div className="relative h-[clamp(8rem,24dvh,12rem)] w-full shrink-0 md:absolute md:inset-0 md:h-auto md:min-h-full">
        <Image
          alt="Surgical practice billing team preparing out of network claims for federal IDR"
          className="object-cover object-[center_20%] md:object-right"
          fill
          priority
          sizes="100vw"
          src="/images/editorial/postcard-hero-billing.png"
        />
      </div>

      {/* Left reading panel only; right half of the photo stays uncovered. */}
      <div className="relative z-10 flex w-full flex-1 md:mt-auto md:items-end">
        <div className="mx-auto flex w-full max-w-[1280px] px-5 pb-8 pt-6 md:px-10 md:pb-14 md:pt-10">
          <div className="hero-frost-panel w-full rounded-[2px] border border-rule/40 p-6 md:max-w-xl md:border-white/60 md:p-8 lg:max-w-2xl lg:p-10">
            <HeroContent eyebrow={eyebrow} tracking={tracking} />
          </div>
        </div>
      </div>
    </section>
  );
}
