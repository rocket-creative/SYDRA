import type { ReactNode } from "react";

import { MagazineShell } from "@/components/ui/magazine-shell";
import { BreadcrumbNav } from "@/components/sydra/breadcrumb-nav";

type SydraPageShellProps = {
  children: ReactNode;
  breadcrumb?: { name: string; path: string }[];
  headerVariant?: "default" | "funnel";
  footerExtra?: ReactNode;
  mainClassName?: string;
  /** Reserve bottom space on mobile for a sticky conversion bar. */
  hasMobileCtaBar?: boolean;
  /**
   * Render children as full-bleed alternating Section bands instead of a single
   * padded white article column. Children should be <Section> elements.
   */
  banded?: boolean;
};

export function SydraPageShell({
  children,
  breadcrumb,
  headerVariant = "default",
  footerExtra,
  mainClassName,
  hasMobileCtaBar = false,
  banded = false,
}: SydraPageShellProps) {
  if (banded) {
    return (
      <MagazineShell
        footerExtra={footerExtra}
        hasMobileCtaBar={hasMobileCtaBar}
        headerVariant={headerVariant}
        mainClassName={`landing-compact ${mainClassName ?? ""}`}
      >
        {breadcrumb ? (
          <div className="bg-white">
            <div className="mx-auto max-w-[1280px] px-5 pt-8 md:px-10 md:pt-10">
              <BreadcrumbNav items={breadcrumb} />
            </div>
          </div>
        ) : null}
        {children}
      </MagazineShell>
    );
  }

  return (
    <MagazineShell footerExtra={footerExtra} headerVariant={headerVariant}>
      <div className={mainClassName ?? "px-5 py-14 md:px-10 md:py-20"}>
        {breadcrumb ? (
          <div className="mx-auto mb-8 max-w-[1280px]">
            <BreadcrumbNav items={breadcrumb} />
          </div>
        ) : null}
        <div className="mx-auto max-w-[1280px]">{children}</div>
      </div>
    </MagazineShell>
  );
}

export const BREADCRUMBS = {
  about: [
    { name: "Home", path: "" },
    { name: "About", path: "/about" },
  ],
  pricing: [
    { name: "Home", path: "" },
    { name: "Pricing", path: "/pricing" },
  ],
  demo: [
    { name: "Home", path: "" },
    { name: "Schedule a demo", path: "/demo" },
  ],
  howItWorks: [
    { name: "Home", path: "" },
    { name: "How it works", path: "/how-it-works" },
  ],
  whatIsIdr: [
    { name: "Home", path: "" },
    { name: "What is IDR", path: "/what-is-idr" },
  ],
  sydraVsAttorney: [
    { name: "Home", path: "" },
    { name: "Sydra vs an IDR attorney", path: "/sydra-vs-idr-attorney" },
  ],
  inHouseIdr: [
    { name: "Home", path: "" },
    { name: "In house IDR", path: "/in-house-idr" },
  ],
  security: [
    { name: "Home", path: "" },
    { name: "Security", path: "/security" },
  ],
  faq: [
    { name: "Home", path: "" },
    { name: "FAQ", path: "/faq" },
  ],
  resources: [
    { name: "Home", path: "" },
    { name: "Resources", path: "/resources" },
  ],
  contact: [
    { name: "Home", path: "" },
    { name: "Contact", path: "/contact" },
  ],
  privacy: [
    { name: "Home", path: "" },
    { name: "Privacy", path: "/privacy" },
  ],
  terms: [
    { name: "Home", path: "" },
    { name: "Terms", path: "/terms" },
  ],
} as const;

/** Home > Resources > <article> trail for an individual resource article. */
export function articleBreadcrumb(name: string, slug: string): { name: string; path: string }[] {
  return [
    { name: "Home", path: "" },
    { name: "Resources", path: "/resources" },
    { name, path: `/resources/${slug}` },
  ];
}
