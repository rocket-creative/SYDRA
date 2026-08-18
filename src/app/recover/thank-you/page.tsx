import { LeadConversionOnMount } from "@/components/analytics/lead-conversion-on-mount";
import { Button } from "@/components/ui/button";
import { MagazineShell } from "@/components/ui/magazine-shell";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Request Received | Sydra",
  description:
    "Your Sydra demo request was received. Our team will follow up within one business day.",
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
      <div className="mx-auto max-w-xl">
        <p className="type-caption text-[var(--color-accent)]">Confirmed</p>
        <h1 className="type-h2 mt-4 text-brand">Request received</h1>
        <p className="mt-6 type-body text-body">
          Check your email for a note from Dr. Abrahams. Our team reviews every request and will
          follow up within one business day to request your free 15-minute demo.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href="/recover" showArrow>
            Back to recover
          </Button>
          <Button href="/" variant="ghost">
            Sydra homepage
          </Button>
        </div>
      </div>
    </MagazineShell>
  );
}
