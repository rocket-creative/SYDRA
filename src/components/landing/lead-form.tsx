"use client";

import { useCallback, useState } from "react";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  editorialInputClass,
  editorialSelectClass,
  FormField,
} from "@/components/ui/form-field";
import { Section } from "@/components/ui/section";
import { US_STATES } from "@/lib/constants/us-states";
import { sydraDemoCalendlyUrl } from "@/lib/landing/calendly";
import type { CampaignTracking } from "@/lib/landing/tracking";
import {
  DISPUTES_PER_MONTH_OPTIONS,
  DISPUTES_LABELS,
  SUPPORTED_STATES,
} from "@/lib/schemas/demo-request";
import {
  LANDING_PRODUCT_LABELS,
  LANDING_PRODUCT_OPTIONS,
  LANDING_ROLE_LABELS,
  LANDING_ROLE_OPTIONS,
} from "@/lib/schemas/postcard-lead";

type LeadFormProps = {
  defaultState: string;
  tracking: CampaignTracking;
  /** "section" renders a full page section. "card" renders a compact white card for the hero. */
  variant?: "section" | "card";
};

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

const CAN_SPAM_ADDRESS =
  "Kronos Health, 244 Westchester Ave, Ste 209, West Harrison, NY 10604";

export function LeadForm({ defaultState, tracking, variant = "section" }: LeadFormProps) {
  const isCard = variant === "card";
  const [state, setState] = useState<FormState>({ status: "idle" });

  const wrap = (
    inner: ReactNode,
    { labelledBy, sidebarLabel }: { labelledBy: string; sidebarLabel?: string },
  ) => {
    if (isCard) {
      return (
        <div
          className="rounded-[2px] border border-rule bg-white p-6 text-left md:p-8"
          id="lead-form"
        >
          {inner}
        </div>
      );
    }
    return (
      <Section ariaLabelledby={labelledBy} id="lead-form" sidebarLabel={sidebarLabel} tone="neutral">
        {inner}
      </Section>
    );
  };

  const headingClass = isCard ? "text-xl font-medium text-brand" : "type-h2 prose-measure text-brand";
  const formClass = isCard
    ? "relative mt-6 space-y-6"
    : "relative mt-10 max-w-2xl space-y-8 rounded-[2px] bg-white p-6 md:p-10";

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setState({ status: "submitting" });

      const formData = new FormData(event.currentTarget);
      const payload = {
        practiceName: formData.get("practiceName"),
        name: formData.get("name"),
        role: formData.get("role"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        state: formData.get("state"),
        disputesPerMonth: formData.get("disputesPerMonth"),
        productInterest: formData.get("productInterest"),
        state_tracking: tracking.state,
        utm_source: tracking.utm_source,
        utm_medium: tracking.utm_medium,
        utm_content: tracking.utm_content,
        landed_at: tracking.landed_at,
        website: formData.get("website") ?? "",
      };

      try {
        const res = await fetch("/api/postcard-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          setState({
            status: "error",
            message: "Something went wrong. Please try again or email sales@sydrahealth.com.",
          });
          return;
        }

        setState({ status: "success" });
      } catch {
        setState({
          status: "error",
          message: "Network error. Check your connection and try again.",
        });
      }
    },
    [tracking],
  );

  if (state.status === "success") {
    return wrap(
      <>
        <h2 className={headingClass} id="heading-lead-success">
          Request received
        </h2>
        <p className={`mt-4 type-body text-body ${isCard ? "" : "prose-measure"}`}>
          A member of our team will follow up within one business day. Pick a time now if you want to
          lock in your five minute Sydra demo.
        </p>
        <div
          className={`mt-6 aspect-[4/3] w-full overflow-hidden border border-rule bg-neutral-section ${isCard ? "" : "max-w-3xl"}`}
        >
          <iframe
            className="h-full min-h-[420px] w-full"
            src={sydraDemoCalendlyUrl()}
            title="Schedule a Sydra demo"
          />
        </div>
      </>,
      { labelledBy: "heading-lead-success" },
    );
  }

  return wrap(
    <>
      <h2 className={headingClass} id="heading-lead-form">
        Book your five minute Sydra demo
      </h2>
      <p className={`mt-3 type-body text-body ${isCard ? "text-[15px] leading-relaxed" : "prose-measure mt-4"}`}>
        Tell us about your practice. We will confirm IDR pathway fit and walk through a real claim on
        the call.
      </p>

      <form className={formClass} onSubmit={handleSubmit}>
        <FormField id="practiceName" label="Practice name" required>
          <input
            required
            aria-required="true"
            autoComplete="organization"
            className={editorialInputClass}
            id="practiceName"
            name="practiceName"
            type="text"
          />
        </FormField>

        <FormField id="name" label="Your name" required>
          <input
            required
            aria-required="true"
            autoComplete="name"
            className={editorialInputClass}
            id="name"
            name="name"
            type="text"
          />
        </FormField>

        <FormField id="role" label="Role" required>
          <select
            required
            aria-required="true"
            className={editorialSelectClass}
            defaultValue=""
            id="role"
            name="role"
          >
            <option disabled value="">
              Select role
            </option>
            {LANDING_ROLE_OPTIONS.map((value) => (
              <option key={value} value={value}>
                {LANDING_ROLE_LABELS[value]}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="email" label="Email" required>
          <input
            required
            aria-required="true"
            autoComplete="email"
            className={editorialInputClass}
            id="email"
            inputMode="email"
            name="email"
            type="email"
          />
        </FormField>

        <FormField id="phone" label="Phone" required>
          <input
            required
            aria-required="true"
            autoComplete="tel"
            className={editorialInputClass}
            id="phone"
            inputMode="tel"
            name="phone"
            type="tel"
          />
        </FormField>

        <FormField id="state" label="State" required>
          <select
            required
            aria-required="true"
            className={editorialSelectClass}
            defaultValue={defaultState || ""}
            id="state"
            name="state"
          >
            <option disabled value="">
              Select state
            </option>
            <optgroup label="Launch states">
              {US_STATES.filter((s) =>
                (SUPPORTED_STATES as readonly string[]).includes(s.code),
              ).map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name} ({s.code})
                </option>
              ))}
            </optgroup>
            <optgroup label="All states">
              {US_STATES.filter(
                (s) => !(SUPPORTED_STATES as readonly string[]).includes(s.code),
              ).map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name} ({s.code})
                </option>
              ))}
            </optgroup>
          </select>
        </FormField>

        <FormField id="disputesPerMonth" label="Monthly out of network claim volume" required>
          <select
            required
            aria-required="true"
            className={editorialSelectClass}
            defaultValue=""
            id="disputesPerMonth"
            name="disputesPerMonth"
          >
            <option disabled value="">
              Select volume
            </option>
            {DISPUTES_PER_MONTH_OPTIONS.map((value) => (
              <option key={value} value={value}>
                {DISPUTES_LABELS[value]}
              </option>
            ))}
          </select>
        </FormField>

        <fieldset>
          <legend className="text-sm font-medium text-brand">
            What are you interested in?
            <span className="text-[var(--color-accent)]">
              <span aria-hidden> *</span>
              <span className="sr-only"> required</span>
            </span>
          </legend>
          <div className="mt-4 space-y-3">
            {LANDING_PRODUCT_OPTIONS.map((value) => (
              <label
                key={value}
                className="flex cursor-pointer items-center gap-3 text-base text-body"
              >
                <input
                  className="h-4 w-4 accent-[var(--color-accent)]"
                  name="productInterest"
                  required
                  type="radio"
                  value={value}
                />
                <span>{LANDING_PRODUCT_LABELS[value]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <input name="state_tracking" type="hidden" value={tracking.state} />
        <input name="utm_source" type="hidden" value={tracking.utm_source} />
        <input name="utm_medium" type="hidden" value={tracking.utm_medium} />
        <input name="utm_content" type="hidden" value={tracking.utm_content} />
        <input name="landed_at" type="hidden" value={tracking.landed_at} />

        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
          <label htmlFor="website">Website</label>
          <input autoComplete="off" id="website" name="website" tabIndex={-1} type="text" />
        </div>

        {state.status === "error" ? (
          <p className="text-sm text-red-700" role="alert">
            {state.message}
          </p>
        ) : null}

        <Button
          className="w-full sm:w-auto"
          disabled={state.status === "submitting"}
          showArrow
          type="submit"
        >
          {state.status === "submitting" ? "Submitting…" : "Request demo"}
        </Button>

        <p className="text-xs leading-relaxed text-body/70">
          By submitting you agree to be contacted by Kronos Health about Sydra and Kronos Revenue. We
          do not sell your information. {CAN_SPAM_ADDRESS}
        </p>
      </form>
    </>,
    { labelledBy: "heading-lead-form", sidebarLabel: "Get started" },
  );
}
