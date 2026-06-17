"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import { trackLeadGA4 } from "@/lib/analytics/ga4";
import { trackDemoConversion } from "@/lib/analytics/google-ads";
import { Button } from "@/components/ui/button";
import {
  editorialInputClass,
  editorialSelectClass,
  FormField,
} from "@/components/ui/form-field";
import { US_STATES } from "@/lib/constants/us-states";
import { isValidTierId } from "@/lib/content/tiers";
import { getSalesEmail, salesMailtoHref } from "@/lib/contact";
import {
  DISPUTES_PER_MONTH_OPTIONS,
  DISPUTES_LABELS,
  IDR_APPROACH_OPTIONS,
  IDR_APPROACH_LABELS,
  SPECIALTY_OPTIONS,
  SPECIALTY_LABELS,
  SUPPORTED_STATES,
  TIER_INTEREST_OPTIONS,
  TIER_LABELS,
} from "@/lib/schemas/demo-request";

type Step = 1 | 2;

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "error"; message: string };

type StepOneData = {
  name: string;
  email: string;
  practiceName: string;
};

const initialStepOne: StepOneData = {
  name: "",
  email: "",
  practiceName: "",
};

type DemoFunnelFormProps = {
  intent?: "demo" | "security";
};

export function DemoFunnelForm({ intent = "demo" }: DemoFunnelFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestType = intent === "security" ? "security" : "demo";
  const submitLabel =
    intent === "security" ? "Request security summary" : "Schedule my demo";
  const [step, setStep] = useState<Step>(1);
  const [stepOne, setStepOne] = useState<StepOneData>(initialStepOne);
  const [state, setState] = useState<FormState>({ status: "idle" });

  const utmSource = searchParams.get("utm_source") ?? "";
  const utmCampaign = searchParams.get("utm_campaign") ?? "";
  const tierParam = searchParams.get("tier");
  const preselectedTier = isValidTierId(tierParam) ? tierParam : "";

  // Entity-page context: a code x state page links here with ?code=&state= so
  // the demo runs on the visitor's actual claim and sales sees the context.
  const entityCode = (searchParams.get("code") ?? "").trim();
  const entityStateRaw = (searchParams.get("state") ?? "").trim().toUpperCase();
  const entityState = US_STATES.some((s) => s.code === entityStateRaw)
    ? entityStateRaw
    : "";
  const entityPayer = (searchParams.get("payer") ?? "").trim();
  const entityMessage = entityCode
    ? `Interested in CPT ${entityCode}${entityState ? ` in ${entityState}` : ""}${
        entityPayer ? ` denied by ${entityPayer}` : ""
      }.`
    : entityPayer
      ? `Interested in disputing ${entityPayer} denials.`
      : "";

  const handleStepOneSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      setStepOne({
        name: String(formData.get("name") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
        practiceName: String(formData.get("practiceName") ?? "").trim(),
      });
      setStep(2);
      setState({ status: "idle" });
    },
    [],
  );

  const handleStepTwoSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setState({ status: "submitting" });
      const formData = new FormData(event.currentTarget);
      const eobFile = formData.get("eobFile");
      const eobFileName =
        eobFile instanceof File && eobFile.size > 0 ? eobFile.name : "";

      const tierInterest = formData.get("tierInterest");

      const payload = {
        ...stepOne,
        specialty: formData.get("specialty"),
        state: formData.get("state"),
        disputesPerMonth: formData.get("disputesPerMonth"),
        idrApproach: formData.get("idrApproach"),
        tierInterest: tierInterest || undefined,
        message: formData.get("message") ?? "",
        eobFileName,
        utmSource,
        utmCampaign,
        website: formData.get("website") ?? "",
        request_type: requestType,
      };

      try {
        const res = await fetch("/api/demo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          setState({
            status: "error",
            message:
              "Something went wrong. Please try again or use the email link below.",
          });
          return;
        }

        trackDemoConversion();
        trackLeadGA4(typeof tierInterest === "string" ? tierInterest : undefined);

        const data = (await res.json()) as { redirect?: string };
        router.push(data.redirect ?? "/demo/thank-you");
      } catch {
        setState({
          status: "error",
          message: "Network error. Check your connection and try again.",
        });
      }
    },
    [requestType, router, stepOne, utmCampaign, utmSource],
  );

  return (
    <div className="border-t border-rule pt-8">
      <div className="flex items-center gap-2" aria-hidden="true">
        <span
          className={`h-1 flex-1 transition-colors ${step >= 1 ? "bg-[var(--color-hero)]" : "bg-rule"}`}
        />
        <span
          className={`h-1 flex-1 transition-colors ${step >= 2 ? "bg-[var(--color-hero)]" : "bg-rule"}`}
        />
      </div>
      <p className="mt-3 type-caption text-body" aria-live="polite">
        Step {step} of 2 · {step === 1 ? "Your details" : "Your practice"}
      </p>

      {step === 1 ? (
        <form className="mt-8 space-y-8" onSubmit={handleStepOneSubmit}>
          <FormField id="name" label="Full name" required>
            <input
              required
              aria-required="true"
              autoComplete="name"
              className={editorialInputClass}
              defaultValue={stepOne.name}
              id="name"
              name="name"
              type="text"
            />
          </FormField>
          <FormField id="email" label="Work email" required>
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
          <FormField id="practiceName" label="Practice name" required>
            <input
              required
              aria-required="true"
              autoComplete="organization"
              className={editorialInputClass}
              defaultValue={stepOne.practiceName}
              id="practiceName"
              name="practiceName"
              type="text"
            />
          </FormField>
          <Button className="w-full sm:w-auto" showArrow type="submit">
            Continue
          </Button>
        </form>
      ) : (
        <form className="relative mt-8 space-y-8" onSubmit={handleStepTwoSubmit}>
          <p className="border-l-2 border-rule py-1 pl-4 text-sm text-body">
            {stepOne.name} · {stepOne.practiceName}
          </p>

          <FormField id="specialty" label="Specialty" required>
            <select required aria-required="true" className={editorialSelectClass} id="specialty" name="specialty">
              <option value="">Select specialty</option>
              {SPECIALTY_OPTIONS.map((value) => (
                <option key={value} value={value}>
                  {SPECIALTY_LABELS[value]}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="state" label="State" required>
            <select
              required
              aria-required="true"
              className={editorialSelectClass}
              defaultValue={entityState}
              id="state"
              name="state"
            >
              <option value="">Select state</option>
              <optgroup label="Supported pathways (2026)">
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

          <FormField id="disputesPerMonth" label="Monthly OON claim estimate" required>
            <select
              required
              aria-required="true"
              className={editorialSelectClass}
              id="disputesPerMonth"
              name="disputesPerMonth"
            >
              <option value="">Select volume</option>
              {DISPUTES_PER_MONTH_OPTIONS.map((value) => (
                <option key={value} value={value}>
                  {DISPUTES_LABELS[value]}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="idrApproach" label="Current IDR approach" required>
            <select required aria-required="true" className={editorialSelectClass} id="idrApproach" name="idrApproach">
              <option value="">Select approach</option>
              {IDR_APPROACH_OPTIONS.map((value) => (
                <option key={value} value={value}>
                  {IDR_APPROACH_LABELS[value]}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            id="eobFile"
            label="Upload an EOB for the demo"
            hint="PDF or image. We review it before the call if you upload one."
          >
            <input
              accept=".pdf,image/*"
              className="mt-2 block w-full text-sm text-body file:mr-4 file:border file:border-rule file:bg-transparent file:px-4 file:py-2 file:text-[13px] file:uppercase file:tracking-[0.08em] file:text-brand hover:file:border-body/40"
              id="eobFile"
              name="eobFile"
              type="file"
            />
          </FormField>

          <FormField id="message" label="Describe your situation">
            <textarea
              className={`${editorialInputClass} min-h-[100px] resize-y`}
              defaultValue={entityMessage}
              id="message"
              name="message"
              rows={4}
            />
          </FormField>

          <FormField id="tierInterest" label="Tier interest">
            <select
              className={editorialSelectClass}
              defaultValue={preselectedTier}
              id="tierInterest"
              name="tierInterest"
            >
              <option value="">Not sure yet</option>
              {TIER_INTEREST_OPTIONS.map((value) => (
                <option key={value} value={value}>
                  {TIER_LABELS[value]}
                </option>
              ))}
            </select>
          </FormField>

          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
            <label htmlFor="website">Website</label>
            <input autoComplete="off" id="website" name="website" tabIndex={-1} type="text" />
          </div>

          {state.status === "error" ? (
            <div className="text-sm text-red-700" role="alert">
              <p>{state.message}</p>
              <p className="mt-2">
                <a className="text-brand underline" href={salesMailtoHref()}>
                  {getSalesEmail()}
                </a>
              </p>
            </div>
          ) : null}

          <div className="flex flex-col gap-4 sm:flex-row-reverse">
            <Button
              className="sm:flex-1"
              disabled={state.status === "submitting"}
              showArrow
              type="submit"
            >
              {state.status === "submitting" ? "Submitting…" : submitLabel}
            </Button>
            <Button
              className="sm:flex-1"
              disabled={state.status === "submitting"}
              type="button"
              variant="ghost"
              onClick={() => setStep(1)}
            >
              Back
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
