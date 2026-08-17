"use client";

import Link from "next/link";

import { CAN_SPAM_ADDRESS, FORM_SUBMIT_NOTICE } from "@/lib/consent/marketing";

export function MarketingConsentFields() {
  return (
    <div className="space-y-3">
      <p className="text-xs leading-relaxed text-body/70">
        {FORM_SUBMIT_NOTICE} See our{" "}
        <Link
          className="underline decoration-rule underline-offset-2 transition-colors hover:text-[var(--color-hero)]"
          href="/privacy"
        >
          Privacy Policy
        </Link>
        . {CAN_SPAM_ADDRESS}
      </p>
    </div>
  );
}
