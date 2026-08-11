"use client";

import Link from "next/link";

import {
  CAN_SPAM_ADDRESS,
  FORM_SUBMIT_NOTICE,
  MARKETING_CONSENT_LABEL,
} from "@/lib/consent/marketing";

type MarketingConsentFieldsProps = {
  idPrefix: string;
  /** Controlled checkbox (lead form). Omit for uncontrolled (contact form). */
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export function MarketingConsentFields({
  idPrefix,
  checked,
  onCheckedChange,
}: MarketingConsentFieldsProps) {
  const checkboxId = `${idPrefix}-marketing-consent`;
  const controlled = typeof checked === "boolean";

  return (
    <div className="space-y-3">
      <label
        className="flex cursor-pointer gap-3 text-xs leading-relaxed text-body/80"
        htmlFor={checkboxId}
      >
        <input
          className="mt-0.5 h-4 w-4 shrink-0 border border-rule text-base accent-[var(--color-hero)]"
          id={checkboxId}
          name="marketingConsent"
          type="checkbox"
          value="true"
          {...(controlled
            ? {
                checked,
                onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                  onCheckedChange?.(event.target.checked),
              }
            : { defaultChecked: false })}
        />
        <span>{MARKETING_CONSENT_LABEL}</span>
      </label>
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
