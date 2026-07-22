"use client";

import { useCallback, useEffect, useState } from "react";

import type { ReactNode } from "react";

import { trackLeadGA4 } from "@/lib/analytics/ga4";
import { reportLeadFormConversion } from "@/lib/analytics/google-ads";
import { Button } from "@/components/ui/button";
import {
  editorialInputClass,
  editorialSelectClass,
  FormField,
} from "@/components/ui/form-field";
import { Section } from "@/components/ui/section";
import { US_STATES } from "@/lib/constants/us-states";
import { sydraDemoCalendlyUrl } from "@/lib/landing/calendly";
import {
  CALCULATOR_UPDATE_EVENT,
  formatAnnualEstimate,
  readCalculatorEstimate,
  type CalculatorEstimate,
} from "@/lib/landing/calculator-estimate";
import type { CampaignTracking } from "@/lib/landing/tracking";
import { mergeUtmForSubmit } from "@/lib/landing/utm-session";
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

type FormStatus =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

type Step = 1 | 2;

type StepOneValues = {
  state: string;
  disputesPerMonth: string;
  email: string;
};

const CAN_SPAM_ADDRESS =
  "Kronos Health, 244 Westchester Ave, Ste 209, West Harrison, NY 10604";

const RISK_STACK =
  "Free demo. No contract, no setup fee, nothing installs in your EMR, and we never take a percentage of your recovery.";

function RiskStack() {
  return <p className="text-xs leading-relaxed text-body/80">{RISK_STACK}</p>;
}

export function LeadForm({ defaultState, tracking, variant = "section" }: LeadFormProps) {
  const isCard = variant === "card";
  const [step, setStep] = useState<Step>(1);
  const [stepOne, setStepOne] = useState<StepOneValues>({
    state: defaultState || "",
    disputesPerMonth: "",
    email: "",
  });
  const [partialSent, setPartialSent] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({ status: "idle" });
  const [estimate, setEstimate] = useState<CalculatorEstimate | null>(null);

  useEffect(() => {
    const sync = () => setEstimate(readCalculatorEstimate());
    sync();
    window.addEventListener(CALCULATOR_UPDATE_EVENT, sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener(CALCULATOR_UPDATE_EVENT, sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

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

  const attributionFields = useCallback(() => {
    const utm = mergeUtmForSubmit(tracking);
    const calc = readCalculatorEstimate();
    return {
      state_tracking: tracking.state,
      route_state: tracking.state,
      route_code: "",
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      utm_content: utm.utm_content,
      landed_at: tracking.landed_at,
      calculator_claims_per_month: calc?.claimsPerMonth ?? null,
      calculator_avg_disputed_amount: calc?.avgDisputedAmount ?? null,
      calculator_annual_estimate: calc?.annualRecovery ?? null,
    };
  }, [tracking]);

  const handleStepOne = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const values: StepOneValues = {
        state: String(formData.get("state") ?? "").trim(),
        disputesPerMonth: String(formData.get("disputesPerMonth") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
      };
      setStepOne(values);
      setFormStatus({ status: "submitting" });

      const payload = {
        leadKind: "partial" as const,
        ...values,
        website: formData.get("website") ?? "",
        ...attributionFields(),
      };

      try {
        const res = await fetch("/api/postcard-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          setFormStatus({
            status: "error",
            message: "Something went wrong. Please try again or email sales@sydrahealth.com.",
          });
          return;
        }
        setPartialSent(true);
        setStep(2);
        setFormStatus({ status: "idle" });
      } catch {
        setFormStatus({
          status: "error",
          message: "Network error. Check your connection and try again.",
        });
      }
    },
    [attributionFields],
  );

  const handleStepTwo = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setFormStatus({ status: "submitting" });

      const formData = new FormData(event.currentTarget);
      const productInterest = formData.get("productInterest");
      const payload = {
        leadKind: "full" as const,
        practiceName: formData.get("practiceName"),
        name: formData.get("name"),
        role: formData.get("role"),
        email: stepOne.email,
        phone: formData.get("phone"),
        state: stepOne.state,
        disputesPerMonth: stepOne.disputesPerMonth,
        productInterest,
        partialUpgraded: partialSent,
        website: formData.get("website") ?? "",
        ...attributionFields(),
      };

      try {
        const res = await fetch("/api/postcard-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          setFormStatus({
            status: "error",
            message: "Something went wrong. Please try again or email sales@sydrahealth.com.",
          });
          return;
        }

        trackLeadGA4(typeof productInterest === "string" ? productInterest : undefined);
        reportLeadFormConversion();
        setFormStatus({ status: "success" });
      } catch {
        setFormStatus({
          status: "error",
          message: "Network error. Check your connection and try again.",
        });
      }
    },
    [attributionFields, partialSent, stepOne],
  );

  if (formStatus.status === "success") {
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
      {estimate ? (
        <p
          className={`mb-3 text-sm leading-relaxed text-brand ${isCard ? "" : "prose-measure"}`}
          data-calculator-handoff
        >
          Your estimate: {formatAnnualEstimate(estimate.annualRecovery)} per year in recoverable
          claims. Let us check it against a real denial.
        </p>
      ) : null}
      <h2 className={headingClass} id="heading-lead-form">
        Book your free five minute Sydra demo
      </h2>
      <p
        className={`mt-3 type-body text-body ${isCard ? "text-[15px] leading-relaxed" : "prose-measure mt-4"}`}
      >
        Bring one denied EOB. We will tell you on the call whether it qualifies and show you the
        dollar figure on that claim. If it does not qualify, you have lost five minutes and nothing
        else.
      </p>

      <p className="mt-4 type-caption text-body" aria-live="polite">
        Step {step} of 2
      </p>

      {step === 1 ? (
        <form className={formClass} onSubmit={handleStepOne}>
          <FormField id="state" label="State" required>
            <select
              required
              aria-required="true"
              className={editorialSelectClass}
              defaultValue={stepOne.state || defaultState || ""}
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
              defaultValue={stepOne.disputesPerMonth}
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

          <FormField id="email" label="Email" required>
            <input
              required
              aria-required="true"
              autoComplete="email"
              className={editorialInputClass}
              defaultValue={stepOne.email}
              id="email"
              inputMode="email"
              name="email"
              type="email"
            />
          </FormField>

          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
            <label htmlFor="website">Website</label>
            <input autoComplete="off" id="website" name="website" tabIndex={-1} type="text" />
          </div>

          {formStatus.status === "error" ? (
            <p className="text-sm text-red-700" role="alert">
              {formStatus.message}
            </p>
          ) : null}

          <RiskStack />

          <Button
            className="w-full sm:w-auto"
            disabled={formStatus.status === "submitting"}
            showArrow
            type="submit"
          >
            {formStatus.status === "submitting" ? "Submitting…" : "See if your claims qualify"}
          </Button>

          <p className="text-xs leading-relaxed text-body/70">
            You agree to be contacted by Kronos Health about Sydra. We do not sell your information.{" "}
            {CAN_SPAM_ADDRESS}
          </p>
        </form>
      ) : (
        <form className={formClass} onSubmit={handleStepTwo}>
          <p className="border-l-2 border-rule py-1 pl-4 text-sm text-body">
            {stepOne.email} · {stepOne.state} ·{" "}
            {DISPUTES_LABELS[stepOne.disputesPerMonth as keyof typeof DISPUTES_LABELS] ??
              stepOne.disputesPerMonth}
          </p>

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
                  className="flex min-h-[44px] cursor-pointer select-none items-center gap-3 text-base text-body"
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

          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
            <label htmlFor="website-step2">Website</label>
            <input
              autoComplete="off"
              id="website-step2"
              name="website"
              tabIndex={-1}
              type="text"
            />
          </div>

          {formStatus.status === "error" ? (
            <p className="text-sm text-red-700" role="alert">
              {formStatus.message}
            </p>
          ) : null}

          <RiskStack />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              className="w-full sm:w-auto"
              disabled={formStatus.status === "submitting"}
              showArrow
              type="submit"
            >
              {formStatus.status === "submitting" ? "Submitting…" : "Request demo"}
            </Button>
            <Button
              className="w-full sm:w-auto"
              disabled={formStatus.status === "submitting"}
              type="button"
              variant="ghost"
              onClick={() => {
                setStep(1);
                setFormStatus({ status: "idle" });
              }}
            >
              Back
            </Button>
          </div>

          <p className="text-xs leading-relaxed text-body/70">
            You agree to be contacted by Kronos Health about Sydra. We do not sell your information.{" "}
            {CAN_SPAM_ADDRESS}
          </p>
        </form>
      )}
    </>,
    { labelledBy: "heading-lead-form", sidebarLabel: "Get started" },
  );
}
