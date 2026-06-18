import { Button } from "@/components/ui/button";
import { BREADCRUMBS, SydraPageShell } from "@/components/sydra/page-shell";
import { PAGE_METADATA } from "@/lib/seo/metadata";

export const metadata = PAGE_METADATA.thankYou;

export default function DemoThankYouPage() {
  return (
    <SydraPageShell
      breadcrumb={[...BREADCRUMBS.demo, { name: "Thank you", path: "/demo/thank-you" }]}
      headerVariant="funnel"
      mainClassName="px-5 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-xl">
        <p className="type-caption text-[var(--color-accent)]">Confirmed</p>
        <h1 className="type-h2 mt-4 text-brand">Request received</h1>
        <p className="mt-6 type-body text-body">
          Our team reviews every request. If your practice is a fit, we&apos;ll follow up within
          one business day at the time you selected to schedule your denied claim walkthrough.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href="/" showArrow>
            Back to homepage
          </Button>
          <Button href="https://sydra.health/" rel="noopener noreferrer" target="_blank" variant="ghost">
            Sign in
          </Button>
        </div>
      </div>
    </SydraPageShell>
  );
}
