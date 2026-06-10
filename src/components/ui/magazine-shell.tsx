import type { ReactNode } from "react";

import { SkipLink } from "@/components/sydra/skip-link";
import { SydraFooter } from "@/components/sydra/footer";
import { SydraHeader } from "@/components/sydra/header";

type MagazineShellProps = {
  children: ReactNode;
  headerVariant?: "default" | "funnel";
  headerBorderless?: boolean;
  footerExtra?: ReactNode;
  showSiteFooter?: boolean;
  mainClassName?: string;
};

/** Unified magazine frame: stone field + white spread (max 1440 / content 1280). */
export function MagazineShell({
  children,
  headerVariant = "default",
  headerBorderless = false,
  footerExtra,
  showSiteFooter = true,
  mainClassName = "",
}: MagazineShellProps) {
  return (
    <div className="min-h-screen bg-[var(--background)] font-sans text-[var(--color-text)]">
      <SkipLink />
      <div className="mx-auto min-h-screen max-w-[1440px] bg-white">
        <SydraHeader borderless={headerBorderless} variant={headerVariant} />
        <main
          className={`pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-0 ${mainClassName}`}
          id="main-content"
          tabIndex={-1}
        >
          {children}
        </main>
        {footerExtra}
        {showSiteFooter ? <SydraFooter /> : null}
      </div>
    </div>
  );
}
