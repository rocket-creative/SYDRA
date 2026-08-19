import type { ReactNode } from "react";

import { MagazineShell } from "@/components/ui/magazine-shell";
import { BreadcrumbNav } from "@/components/sydra/breadcrumb-nav";
import { StickyPageCta } from "@/components/sydra/sticky-page-cta";
import {
  CALL_CTA_SHORT_LABEL,
  CALL_PATH,
  PRIMARY_CTA_SHORT_LABEL,
} from "@/lib/case-review";

type SydraPageShellProps = {
  children: ReactNode;
  breadcrumb?: { name: string; path: string }[];
  headerVariant?: "default" | "funnel";
  footerExtra?: ReactNode;
  mainClassName?: string;
  /** Reserve bottom space on mobile for a sticky conversion bar. */
  hasMobileCtaBar?: boolean;
  /** Programmatic pages: sticky "Send us this denial" bar under 768px. */
  stickyDemoHref?: string;
  /**
   * Long content pages: sticky bar under 1024px, so phones reach the ask without
   * scrolling to the closing section. Leads with the 15-minute call and keeps
   * this href as the second slot, which is the claim review.
   */
  stickyCtaHref?: string;
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
  stickyDemoHref,
  stickyCtaHref,
  banded = false,
}: SydraPageShellProps) {
  const reserveMobileBar =
    hasMobileCtaBar || Boolean(stickyDemoHref) || Boolean(stickyCtaHref);
  const mobileCtaBreakpoint =
    stickyDemoHref && !hasMobileCtaBar && !stickyCtaHref ? "md" : "lg";
  const sticky = stickyDemoHref ? (
    <StickyPageCta
      hideAt="md"
      href={stickyDemoHref}
      label="Send us this denial"
      placement="programmatic-sticky"
    />
  ) : stickyCtaHref ? (
    <StickyPageCta
      href={CALL_PATH}
      label={CALL_CTA_SHORT_LABEL}
      secondaryHref={stickyCtaHref}
      secondaryLabel={PRIMARY_CTA_SHORT_LABEL}
    />
  ) : null;

  if (banded) {
    return (
      <MagazineShell
        footerExtra={footerExtra}
        hasMobileCtaBar={reserveMobileBar}
        headerVariant={headerVariant}
        mainClassName={`landing-compact ${mainClassName ?? ""}`}
        mobileCtaBreakpoint={mobileCtaBreakpoint}
      >
        {breadcrumb ? (
          <div className="bg-white">
            <div className="mx-auto max-w-[1280px] px-4 pt-8 md:px-10 md:pt-10">
              <BreadcrumbNav items={breadcrumb} />
            </div>
          </div>
        ) : null}
        {children}
        {sticky}
      </MagazineShell>
    );
  }

  return (
    <MagazineShell
      footerExtra={footerExtra}
      hasMobileCtaBar={reserveMobileBar}
      headerVariant={headerVariant}
      mobileCtaBreakpoint={mobileCtaBreakpoint}
    >
      <div className={mainClassName ?? "px-4 py-12 md:px-10 md:py-20"}>
        {breadcrumb ? (
          <div className="mx-auto mb-8 max-w-[1280px]">
            <BreadcrumbNav items={breadcrumb} />
          </div>
        ) : null}
        <div className="mx-auto max-w-[1280px]">{children}</div>
      </div>
      {sticky}
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
    { name: "Set up a demo", path: "/demo" },
  ],
  caseReview: [
    { name: "Home", path: "" },
    { name: "Claim review", path: "/case-review" },
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
    { name: "Compare your IDR options", path: "/sydra-vs-idr-attorney" },
  ],
  inHouseIdr: [
    { name: "Home", path: "" },
    { name: "In house IDR", path: "/in-house-idr" },
  ],
  idrForBillingCompanies: [
    { name: "Home", path: "" },
    { name: "IDR for billing companies", path: "/idr-for-billing-companies" },
  ],
  idrForContingencyFirms: [
    { name: "Home", path: "" },
    { name: "IDR for contingency firms", path: "/idr-for-contingency-firms" },
  ],
  idrFilingDeadline: [
    { name: "Home", path: "" },
    { name: "IDR filing deadline", path: "/idr-filing-deadline" },
  ],
  security: [
    { name: "Home", path: "" },
    { name: "Security", path: "/security" },
  ],
  faq: [
    { name: "Home", path: "" },
    { name: "FAQ", path: "/faq" },
  ],
  roadmap: [
    { name: "Home", path: "" },
    { name: "Roadmap", path: "/roadmap" },
  ],
  resources: [
    { name: "Home", path: "" },
    { name: "Resources", path: "/resources" },
  ],
  resourcesUpdates: [
    { name: "Home", path: "" },
    { name: "Resources", path: "/resources" },
    { name: "Updates", path: "/resources/updates" },
  ],
  glossary: [
    { name: "Home", path: "" },
    { name: "Glossary", path: "/glossary" },
  ],
  idrRecoveryCalculator: [
    { name: "Home", path: "" },
    { name: "IDR recovery calculator", path: "/idr-recovery-calculator" },
  ],
  contact: [
    { name: "Home", path: "" },
    { name: "Contact", path: "/contact" },
  ],
  privacy: [
    { name: "Home", path: "" },
    { name: "Privacy", path: "/privacy" },
  ],
  doNotSell: [
    { name: "Home", path: "" },
    { name: "Do not sell or share", path: "/do-not-sell" },
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

/** Home > Resources > Updates > <post> trail for a dated resource update. */
export function updateBreadcrumb(name: string, slug: string): { name: string; path: string }[] {
  return [
    { name: "Home", path: "" },
    { name: "Resources", path: "/resources" },
    { name: "Updates", path: "/resources/updates" },
    { name, path: `/resources/updates/${slug}` },
  ];
}
