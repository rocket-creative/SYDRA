import { Section } from "@/components/ui/section";
import { CtaLink } from "@/components/ui/cta-link";
import { EditorialImage } from "@/components/ui/editorial-image";
import { FullServiceBanner } from "@/components/sydra/full-service-banner";
import { CASE_REVIEW_CTA, caseReviewUrl } from "@/lib/case-review";

export function SydraAbout() {
  return (
    <>
      <Section ariaLabelledby="heading-about" id="about" sidebarLabel="About" tone="white">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16">
          <div className="min-w-0">
            <p className="type-caption text-[var(--color-accent)]">About Sydra</p>
            <h2 className="type-h2 prose-measure mt-3 text-brand" id="heading-about">
              Built from a working RCM operation
            </h2>
            <div className="mt-8 max-w-2xl space-y-4 type-body text-body">
              <p>
                Sydra was built by{" "}
                <strong className="text-brand">Dr. John Abrahams</strong>, a practicing neurosurgeon
                who saw billing teams spend 30 minutes per claim on IDR submissions that should take
                under 5. The product comes from a working RCM operation that runs claims every day,
                not a technology startup.
              </p>
              <p>
                The revenue cycle team trained the system on real determinations. Chelsea leads
                software and integrations. Heisha Rivera leads revenue cycle operations and the
                specialists who support Guided Support customers.
              </p>
              <p>
                Sydra is in production at NY Brain and Spine Surgery and rolling out to additional
                surgical practices in New York, Texas, California, New Jersey, Florida, and Arizona
                in 2026.
              </p>
              <p>
                Need it fully handled?{" "}
                <a
                  className="text-brand underline decoration-rule underline-offset-4"
                  href={caseReviewUrl()}
                >
                  {CASE_REVIEW_CTA}
                </a>
              </p>
            </div>
            <p className="mt-8">
              <CtaLink href="/about">Read the full team story</CtaLink>
            </p>
          </div>
          <EditorialImage
            alt="Sydra billing specialists reviewing claim paperwork at a workstation"
            aspect="4/5"
            className="lg:sticky lg:top-24"
            sizes="(max-width: 1024px) 100vw, 40vw"
            src="/images/editorial/team-paperwork-review.png"
          />
        </div>
      </Section>
      <FullServiceBanner />
    </>
  );
}
