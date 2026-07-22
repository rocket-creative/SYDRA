"use client";

import { useSearchParams } from "next/navigation";
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
import {
  CALCULATOR_UPDATE_EVENT,
  formatAnnualEstimate,
  readCalculatorEstimate,
  type CalculatorEstimate,
} from "@/lib/landing/calculator-estimate";
import {
  mergeRouteForSubmit,
  persistRouteFirstTouch,
} from "@/lib/landing/route-session";
import type { CampaignTracking } from "@/lib/landing/tracking";
import { mergeUtmForSubmit, persistUtmFirstTouch } from "@/lib/landing/utm-session";
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
  /** DOM id for scroll targets. Defaults to lead-form. */
  anchorId?: string;
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

function resolvePrefillState(
  urlState: string,
  defaultState: string,
  trackingState: string,
): string {
  const candidates = [urlState, defaultState, trackingState];
  for (const raw of candidates) {
    const code = raw.trim().toUpperCase();
    if (US_STATES.some((s) => s.code === code)) return code;
  }
  return "";
}

export function LeadForm({
  defaultState,
  tracking,
  variant = "section",
  anchorId = "lead-form",
}: LeadFormProps) {
  const searchParams = useSearchParams();
  const urlState = (searchParams.get("state") ?? "").trim().toUpperCase();
  const urlCode = (searchParams.get("code") ?? "").trim();
  const prefillState = resolvePrefillState(urlState, defaultState, tracking.state);

  const isCard = variant === "card";
  const [step, setStep] = useState<Step>(1);
  const [stepOne, setStepOne] = useState<StepOneValues>({
    state: prefillState,
    disputesPerMonth: "",
    email: "",
  });
  const [partialSent, setPartialSent] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({ status: "idle" });
  const [estimate, setEstimate] = useState<CalculatorEstimate | null>(null);
  const [routeCtx, setRouteCtx] = useState(() =>
    mergeRouteForSubmit(tracking.state),
  );

  useEffect(() => {
    const persisted = persistRouteFirstTouch({ state: urlState, code: urlCode });
    setRouteCtx({
      state: persisted.state || mergeRouteForSubmit(tracking.state).state,
      code: persisted.code,
    });
    persistUtmFirstTouch({
      utm_source: searchParams.get("utm_source") ?? tracking.utm_source,
      utm_medium: searchParams.get("utm_medium") ?? tracking.utm_medium,
      utm_campaign: searchParams.get("utm_campaign") ?? tracking.utm_campaign,
      utm_content: searchParams.get("utm_content") ?? tracking.utm_content,
    });
  }, [
    searchParams,
    tracking.state,
    tracking.utm_campaign,
    tracking.utm_content,
    tracking.utm_medium,
    tracking.utm_source,
    urlCode,
    urlState,
  ]);

  useEffect(() => {
    if (!prefillState) return;
    setStepOne((prev) => (prev.state ? prev : { ...prev, state: prefillState }));
  }, [prefillState]);

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
          id={anchorId}
        >
          {inner}
        </div>
      );
    }
    return (
      <Section
        ariaLabelledby={labelledBy}
        id={anchorId}
        sidebarLabel={sidebarLabel}
        tone="neutral"
      >
        {inner}
      </Section>
    );
  };

  const headingClass = isCard ? "text-xl font-medium text-brand" : "type-h2 prose-measure text-brand";
  const formClass = isCard
    ? "relative mt-6 space-y-6"
    : "relative mt-10 max-w-2xl space-y-8 rounded-[2px] bg-white p-6 md:p-10";
  const headingId = `heading-${anchorId}`;
  const successHeadingId = `heading-${anchorId}-success`;
  const fieldId = (name: string) => `${anchorId}-${name}`;

  const attributionFields = useCallback(() => {
    const utm = mergeUtmForSubmit(tracking);
    const route = {
      state: routeCtx.state || mergeRouteForSubmit(tracking.state).state,
      code: routeCtx.code || mergeRouteForSubmit(tracking.state).code,
    };
    const calc = readCalculatorEstimate();
    return {
      state_tracking: tracking.state,
      route_state: route.state,
      route_code: route.code,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      utm_content: utm.utm_content,
      landed_at: tracking.landed_at,
      calculator_claims_per_month: calc?.claimsPerMonth ?? null,
      calculator_avg_disputed_amount: calc?.avgDisputedAmount ?? null,
      calculator_annual_estimate: calc?.annualRecovery ?? null,
    };
  }, [routeCtx.code, routeCtx.state, tracking]);

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
        <h2 className={headingClass} id={successHeadingId}>
          Request received
        </h2>
        <p className={`mt-4 type-body text-body ${isCard ? "" : "prose-measure"}`}>
          Check your email for a note from Dr. Abrahams. A member of our team will follow up within
          one business day to schedule your free five minute demo.
        </p>
      </>,
      { labelledBy: successHeadingId },
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
      <h2 className={headingClass} id={headingId}>
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
          <input name="route_state" type="hidden" value={routeCtx.state} />
          <input name="route_code" type="hidden" value={routeCtx.code} />

          <FormField id={fieldId("state")} label="State" required>
            <select
              required
              aria-required="true"
              className={editorialSelectClass}
              defaultValue={stepOne.state || prefillState || ""}
              id={fieldId("state")}
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

          <FormField id={fieldId("disputesPerMonth")} label="Monthly out of network claim volume" required>
            <select
              required
              aria-required="true"
              className={editorialSelectClass}
              defaultValue={stepOne.disputesPerMonth}
              id={fieldId("disputesPerMonth")}
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

          <FormField id={fieldId("email")} label="Email" required>
            <input
              required
              aria-required="true"
              autoComplete="email"
              className={editorialInputClass}
              defaultValue={stepOne.email}
              id={fieldId("email")}
              inputMode="email"
              name="email"
              type="email"
            />
          </FormField>

          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
            <label htmlFor={fieldId("website")}>Website</label>
            <input
              autoComplete="off"
              id={fieldId("website")}
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

          <FormField id={fieldId("practiceName")} label="Practice name" required>
            <input
              required
              aria-required="true"
              autoComplete="organization"
              className={editorialInputClass}
              id={fieldId("practiceName")}
              name="practiceName"
              type="text"
            />
          </FormField>

          <FormField id={fieldId("name")} label="Your name" required>
            <input
              required
              aria-required="true"
              autoComplete="name"
              className={editorialInputClass}
              id={fieldId("name")}
              name="name"
              type="text"
            />
          </FormField>

          <FormField id={fieldId("role")} label="Role" required>
            <select
              required
              aria-required="true"
              className={editorialSelectClass}
              defaultValue=""
              id={fieldId("role")}
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

          <FormField id={fieldId("phone")} label="Phone" required>
            <input
              required
              aria-required="true"
              autoComplete="tel"
              className={editorialInputClass}
              id={fieldId("phone")}
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
            <label htmlFor={fieldId("website-step2")}>Website</label>
            <input
              autoComplete="off"
              id={fieldId("website-step2")}
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
    { labelledBy: headingId, sidebarLabel: "Get started" },
  );
}
