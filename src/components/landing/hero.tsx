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
    <div className="max-w-3xl">
      <div aria-hidden className="rule-draw mb-5 h-px w-16 bg-[var(--color-accent)]" />
      <p className="hero-eyebrow font-mono text-xs uppercase tracking-[0.14em] text-body md:text-[11px] md:text-body/70">
        {eyebrow}
      </p>
      <h1 className="type-display mt-4 text-brand" id="landing-hero-heading">
        <SplitHeadline text="Stop writing off out of network claims." />
      </h1>
      <p className="hero-sub prose-measure mt-5 type-body text-body">
        Your billing team recovers underpaid out of network claims in five minutes per claim, and
        you keep every dollar. No attorney, no 20% cut. Built by a surgeon who files these claims
        himself.
      </p>
      <HeroCtas tracking={tracking} />
      <HeroProofStack className="mt-10 lg:hidden" />
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
          alt="Surgical practice billing team preparing out of network claims for federal IDR"
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
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <HeroContent eyebrow={eyebrow} tracking={tracking} />
            </div>
            <div className="hidden lg:col-span-5 lg:block">
              <HeroProofStack />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
