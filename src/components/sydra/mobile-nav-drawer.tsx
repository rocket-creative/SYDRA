"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

type NavItem = { href: string; label: string };

type MobileNavDrawerProps = {
  nav: readonly NavItem[];
  linkClass: string;
  signInHref?: string;
};

export function MobileNavDrawer({ nav, linkClass, signInHref }: MobileNavDrawerProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={buttonRef}
        aria-controls={panelId}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex min-h-[44px] min-w-[44px] select-none items-center justify-center text-brand lg:hidden"
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        <svg
          aria-hidden
          fill="none"
          height="20"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          width="20"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          ) : (
            <>
              <path d="M4 7h16" strokeLinecap="round" />
              <path d="M4 12h16" strokeLinecap="round" />
              <path d="M4 17h16" strokeLinecap="round" />
            </>
          )}
        </svg>
      </button>

      {open ? (
        <>
          <button
            aria-hidden
            className="fixed inset-0 z-[90] bg-black/30 lg:hidden"
            onClick={close}
            tabIndex={-1}
            type="button"
          />
          <nav
            ref={panelRef}
            aria-label="Primary mobile"
            className="fixed inset-y-0 right-0 z-[95] flex w-[min(100%,20rem)] flex-col border-l border-rule bg-white pt-[max(0.5rem,env(safe-area-inset-top))] pb-safe-bottom shadow-lg lg:hidden"
            id={panelId}
          >
            <div className="flex items-center justify-between border-b border-rule px-5 py-4">
              <span className="text-sm font-medium uppercase tracking-[0.12em] text-brand">
                Menu
              </span>
              <button
                aria-label="Close menu"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-brand"
                onClick={close}
                type="button"
              >
                <svg
                  aria-hidden
                  fill="none"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="20"
                >
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <ul className="flex-1 overflow-y-auto px-5 py-2">
              {signInHref ? (
                <li className="border-b border-rule pb-2 mb-2">
                  <a
                    className={`inline-flex min-h-[44px] w-full items-center text-sm transition-colors duration-300 ${linkClass}`}
                    href={signInHref}
                    onClick={close}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Sign in
                  </a>
                </li>
              ) : null}
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    className={`inline-flex min-h-[44px] w-full items-center text-sm transition-colors duration-300 ${linkClass}`}
                    href={item.href}
                    onClick={close}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      ) : null}
    </>
  );
}
