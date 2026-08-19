import { LeadConversionOnMount } from "@/components/analytics/lead-conversion-on-mount";
import { Button } from "@/components/ui/button";
import { CalendlyEmbed } from "@/components/sydra/calendly-embed";
import { MagazineShell } from "@/components/ui/magazine-shell";
import { SALES_PHONE_DISPLAY, SALES_PHONE_TEL } from "@/lib/contact";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Claim Review Request Received | Sydra",
  description:
    "Your Sydra claim review request was received. Our team will follow up within one business day.",
  path: "/recover/thank-you",
  robots: { index: false, follow: false },
});

/**
 * Paid /recover conversion landing. Fires Google Ads "Submit lead form"
 * exactly once when LeadForm set the session hand-off flag.
 */
export default function RecoverThankYouPage() {
  return (
    <MagazineShell headerVariant="funnel" mainClassName="px-4 py-16 md:px-10 md:py-24">
      <LeadConversionOnMount action="free_demo" />
      <div className="mx-auto max-w-3xl">
        <div className="max-w-xl">
          <p className="type-caption text-[var(--color-accent)]">Confirmed</p>
          <h1 className="type-h2 mt-4 text-brand">Claim review request received</h1>
          <p className="mt-6 type-body text-body">
            Check your email for a note from Dr. Abrahams. Our team reviews every request and will come
            back within one business day with whether the claim qualifies for federal IDR and what it
            is worth. If you want to see Sydra on a live claim, pick a time below.
          </p>
          <p className="mt-4 type-body text-body">
            Or set up a call:{" "}
            <a className="underline underline-offset-2" href={SALES_PHONE_TEL}>
              {SALES_PHONE_DISPLAY}
            </a>
          </p>
        </div>
        <CalendlyEmbed className="mt-10" />
        <div className="mt-10">
          <Button href="/" variant="ghost">
            Sydra homepage
          </Button>
        </div>
      </div>
    </MagazineShell>
  );
}
