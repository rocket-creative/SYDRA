"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import type { ReactNode } from "react";

import { trackLeadGA4 } from "@/lib/analytics/ga4";
import {
  markLeadConversionPending,
  reportAdsConversion,
  whenGtagReady,
  type AdsConversionAction,
} from "@/lib/analytics/google-ads";
import { MarketingConsentFields } from "@/components/forms/marketing-consent";
import { Button } from "@/components/ui/button";
import {
  editorialInputClass,
  editorialSelectClass,
  FormField,
} from "@/components/ui/form-field";
import { Section } from "@/components/ui/section";
import { CONSENT_TEXT_VERSION } from "@/lib/consent/marketing";
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

type LeadFormIntent = "demo" | "case-review";

type LeadFormProps = {
  defaultState: string;
  tracking: CampaignTracking;
  /** "section" renders a full page section. "card" renders a compact white card for the hero. */
  variant?: "section" | "card";
  /** DOM id for scroll targets. Defaults to lead-form. */
  anchorId?: string;
  /** Thank-you redirect after a full lead. Defaults to /demo/thank-you. */
  thankYouPath?: string;
  /** Attribution tag for GA4 generate_lead (recover | demo | home | case-review). */
  landingPage?: string;
  /**
   * Demo booking vs claim-review copy. Both intents fire Google Ads
   * Primary "Submit lead form" (`MhI6CKKQz8scEKqpzPtD`) on thank-you.
   */
  intent?: LeadFormIntent;
};

type FormStatus =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "error"; message: string };

const DEFAULT_THANK_YOU_PATH = "/demo/thank-you";

type Step = 1 | 2;

type StepOneValues = {
  email: string;
};

const EMAIL_DELIVERY_ERROR =
  "We could not reach our team inbox. Email sales@sydrahealth.com and we will follow up right away.";

const COPY_BY_INTENT: Record<
  LeadFormIntent,
  {
    headline: string;
    body: string;
    riskStack: string;
    stepOneCta: string;
    stepTwoCta: string;
    phoneError: string;
    conversionAction: AdsConversionAction;
    defaultProductInterest: (typeof LANDING_PRODUCT_OPTIONS)[number] | null;
    showProductInterest: boolean;
  }
> = {
  demo: {
    headline: "Book your free five minute Sydra demo",
    body: "Bring one denied EOB. We will tell you on the call whether it qualifies and show you the dollar figure on that claim. If it does not qualify, you have lost five minutes and nothing else.",
    riskStack:
      "Free demo. No contract, no setup fee, nothing installs in your EMR, and we never take a percentage of your recovery.",
    stepOneCta: "Book a free demo",
    stepTwoCta: "Request demo",
    phoneError: "Enter a phone number so we can reach you about the demo.",
    conversionAction: "free_demo",
    defaultProductInterest: null,
    showProductInterest: true,
  },
  "case-review": {
    headline: "Get your free claim review",
    body: "Tell us about your practice and monthly out of network volume. Our team reviews your situation and follows up within one business day with a clear recommendation.",
    riskStack:
      "Free claim review. No contract, no setup fee, and we never take a percentage of your recovery.",
    stepOneCta: "Start free claim review",
    stepTwoCta: "Submit claim review request",
    phoneError: "Enter a phone number so we can reach you about your claim review.",
    // Same Primary "Submit lead form" action as demo/recover (MhI6…).
    conversionAction: "free_demo",
    defaultProductInterest: "done_for_you",
    showProductInterest: false,
  },
};

function RiskStack({ text }: { text: string }) {
  return <p className="text-xs leading-relaxed text-body/80">{text}</p>;
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

async function readLeadResponse(res: Response): Promise<{
  ok: boolean;
  emailDelivered?: boolean;
}> {
  try {
    const data = (await res.json()) as { ok?: boolean; emailDelivered?: boolean };
    return {
      ok: res.ok && data.ok !== false,
      emailDelivered: data.emailDelivered,
    };
  } catch {
    return { ok: res.ok };
  }
}

export function LeadForm({
  defaultState,
  tracking,
  variant = "section",
  anchorId = "lead-form",
  thankYouPath = DEFAULT_THANK_YOU_PATH,
  landingPage,
  intent = "demo",
}: LeadFormProps) {
  const copy = COPY_BY_INTENT[intent];
  const searchParams = useSearchParams();
  const urlState = (searchParams.get("state") ?? "").trim().toUpperCase();
  const urlCode = (searchParams.get("code") ?? "").trim();
  const prefillState = resolvePrefillState(urlState, defaultState, tracking.state);

  const isCard = variant === "card";
  const [step, setStep] = useState<Step>(1);
  const [stepOne, setStepOne] = useState<StepOneValues>({ email: "" });
  const [partialSent, setPartialSent] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({ status: "idle" });
  const [phone, setPhone] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
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

  const headingClass = isCard
    ? "text-[1.625rem] font-semibold leading-tight tracking-[-0.02em] text-brand md:text-[1.875rem] lg:text-[2.125rem]"
    : "type-h2 prose-measure font-semibold text-brand";
  const formClass = isCard
    ? "relative mt-6 space-y-6"
    : "relative mt-10 max-w-2xl space-y-8 rounded-[2px] bg-white p-6 md:p-10";
  const headingId = `heading-${anchorId}`;
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
        email: String(formData.get("email") ?? "").trim(),
      };
      setStepOne(values);
      setFormStatus({ status: "submitting" });

      const payload = {
        leadKind: "partial" as const,
        email: values.email,
        website: formData.get("website") ?? "",
        marketingConsent,
        consentTextVersion: CONSENT_TEXT_VERSION,
        ...attributionFields(),
      };

      try {
        const res = await fetch("/api/postcard-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await readLeadResponse(res);
        if (!result.ok) {
          setFormStatus({
            status: "error",
            message: "Something went wrong. Please try again or email sales@sydrahealth.com.",
          });
          return;
        }
        if (result.emailDelivered === false) {
          console.error("[lead-form] Partial lead emailDelivered:false", values.email);
          setFormStatus({ status: "error", message: EMAIL_DELIVERY_ERROR });
          return;
        }
        setPartialSent(true);
        setPhone("");
        setStep(2);
        setFormStatus({ status: "idle" });
      } catch {
        setFormStatus({
          status: "error",
          message: "Network error. Check your connection and try again.",
        });
      }
    },
    [attributionFields, marketingConsent],
  );

  const handleStepTwo = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setFormStatus({ status: "submitting" });

      const formData = new FormData(event.currentTarget);
      const productInterest =
        formData.get("productInterest") || copy.defaultProductInterest;
      const phoneValue = phone.trim();
      if (!phoneValue || phoneValue.includes("@")) {
        setFormStatus({
          status: "error",
          message: copy.phoneError,
        });
        return;
      }

      const payload = {
        leadKind: "full" as const,
        practiceName: formData.get("practiceName"),
        name: formData.get("name"),
        role: formData.get("role"),
        email: stepOne.email,
        phone: phoneValue,
        state: formData.get("state"),
        disputesPerMonth: formData.get("disputesPerMonth"),
        productInterest,
        partialUpgraded: partialSent,
        website: formData.get("website") ?? "",
        marketingConsent,
        consentTextVersion: CONSENT_TEXT_VERSION,
        ...attributionFields(),
      };

      try {
        const res = await fetch("/api/postcard-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await readLeadResponse(res);

        if (!result.ok) {
          setFormStatus({
            status: "error",
            message: "Something went wrong. Please try again or email sales@sydrahealth.com.",
          });
          return;
        }
        if (result.emailDelivered === false) {
          console.error("[lead-form] Full lead emailDelivered:false", stepOne.email);
        }

        trackLeadGA4(
          typeof productInterest === "string" ? productInterest : undefined,
          landingPage,
        );
        const transactionId = markLeadConversionPending({
          email: stepOne.email,
          landingPage,
          action: copy.conversionAction,
        });
        await whenGtagReady();
        reportAdsConversion({
          url: thankYouPath,
          transactionId: transactionId ?? undefined,
          email: stepOne.email,
          action: copy.conversionAction,
        });
      } catch {
        setFormStatus({
          status: "error",
          message: "Network error. Check your connection and try again.",
        });
      }
    },
    [
      attributionFields,
      copy.conversionAction,
      copy.defaultProductInterest,
      copy.phoneError,
      landingPage,
      marketingConsent,
      partialSent,
      phone,
      stepOne.email,
      thankYouPath,
    ],
  );

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
        {copy.headline}
      </h2>
      <p
        className={`mt-3 type-body text-body ${isCard ? "text-[15px] leading-relaxed" : "prose-measure mt-4"}`}
      >
        {copy.body}
      </p>

      <p className="mt-4 type-caption text-body" aria-live="polite">
        {step === 1 ? "Start with your work email" : "Almost done"}
      </p>

      {step === 1 ? (
        <form
          action="/api/postcard-lead"
          className={formClass}
          method="post"
          onSubmit={handleStepOne}
        >
          <input name="route_state" type="hidden" value={routeCtx.state} />
          <input name="route_code" type="hidden" value={routeCtx.code} />

          <FormField id={fieldId("email")} label="Work email" required>
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

          <RiskStack text={copy.riskStack} />

          <MarketingConsentFields
            checked={marketingConsent}
            idPrefix={`${anchorId}-step1`}
            onCheckedChange={setMarketingConsent}
          />

          <Button
            className="w-full sm:w-auto"
            disabled={formStatus.status === "submitting"}
            showArrow
            type="submit"
          >
            {formStatus.status === "submitting" ? "Submitting…" : copy.stepOneCta}
          </Button>
        </form>
      ) : (
        <form
          action="/api/postcard-lead"
          autoComplete="on"
          className={formClass}
          method="post"
          onSubmit={handleStepTwo}
        >
          <p className="border-l-2 border-rule py-1 pl-4 text-sm text-body">{stepOne.email}</p>

          {/* Keep email in the DOM so browsers do not dump Step 1 email into Phone. */}
          <input
            aria-hidden
            autoComplete="email"
            className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
            name="email"
            readOnly
            tabIndex={-1}
            type="email"
            value={stepOne.email}
          />

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
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </FormField>

          <FormField id={fieldId("state")} label="State" required>
            <select
              required
              aria-required="true"
              className={editorialSelectClass}
              defaultValue={prefillState || ""}
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

          <FormField
            id={fieldId("disputesPerMonth")}
            label="Monthly out of network claim volume"
            required
          >
            <select
              required
              aria-required="true"
              className={editorialSelectClass}
              defaultValue=""
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

          {copy.showProductInterest ? (
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
          ) : copy.defaultProductInterest ? (
            <input name="productInterest" type="hidden" value={copy.defaultProductInterest} />
          ) : null}

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

          <RiskStack text={copy.riskStack} />

          <MarketingConsentFields
            checked={marketingConsent}
            idPrefix={`${anchorId}-step2`}
            onCheckedChange={setMarketingConsent}
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              className="w-full sm:w-auto"
              disabled={formStatus.status === "submitting"}
              showArrow
              type="submit"
            >
              {formStatus.status === "submitting" ? "Submitting…" : copy.stepTwoCta}
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
        </form>
      )}
    </>,
    { labelledBy: headingId, sidebarLabel: "Get started" },
  );
}
