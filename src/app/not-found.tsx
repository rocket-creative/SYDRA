import { MagazineShell } from "@/components/ui/magazine-shell";
import { Button } from "@/components/ui/button";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Page Not Found | Sydra",
  description:
    "The page you requested wasn't found on the Sydra marketing site. Return to the homepage or schedule a demo to see NSA IDR software for surgical billing teams.",
  path: "/404",
  robots: { index: false, follow: false },
});

export default function NotFound() {
  return (
    <MagazineShell>
      <div className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-xl">
          <p className="type-caption text-[var(--color-accent)]">404</p>
          <h1 className="type-h2 mt-4 text-brand">Page not found</h1>
          <p className="mt-6 type-body text-body">
            That URL isn&apos;t on this site. Head back to the homepage or schedule a demo to see
            Sydra on a real denied claim.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/" showArrow>
              Back to homepage
            </Button>
            <Button href="/demo" showArrow variant="ghost">
              Schedule a demo
            </Button>
          </div>
        </div>
      </div>
    </MagazineShell>
  );
}
