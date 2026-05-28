"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

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

const inputClass =
  "mt-1.5 min-h-12 w-full rounded-md border border-slate-200 px-3 py-2.5 text-base text-slate-900 outline-none ring-offset-2 transition-colors duration-200 focus:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-500/30";

const selectClass = `${inputClass} bg-white`;

const buttonPrimaryClass =
  "min-h-12 w-full rounded-md bg-[#1A2B48] py-3 text-base font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition duration-300 ease-out hover:opacity-[0.92] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const buttonSecondaryClass =
  "min-h-12 w-full rounded-md border border-slate-200 bg-white py-3 text-base font-semibold text-[#1A2B48] transition duration-300 ease-out hover:bg-slate-50 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

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

      const payload = {
        ...stepOne,
        specialty: formData.get("specialty"),
        state: formData.get("state"),
        disputesPerMonth: formData.get("disputesPerMonth"),
        idrApproach: formData.get("idrApproach"),
        tierInterest: formData.get("tierInterest") || undefined,
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
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div
          className={`flex size-8 items-center justify-center rounded-full text-sm font-semibold ${step === 1 ? "bg-[#1A2B48] text-white" : "bg-emerald-100 text-emerald-800"}`}
          aria-hidden
        >
          {step === 1 ? "1" : "✓"}
        </div>
        <div className="h-px flex-1 bg-slate-200" aria-hidden />
        <div
          className={`flex size-8 items-center justify-center rounded-full text-sm font-semibold ${step === 2 ? "bg-[#1A2B48] text-white" : "bg-slate-100 text-slate-400"}`}
          aria-hidden
        >
          2
        </div>
      </div>
      <p className="text-center text-sm font-medium text-slate-500" aria-live="polite">
        Step {step} of 2
      </p>

      {step === 1 ? (
        <form className="mt-6 space-y-5" onSubmit={handleStepOneSubmit}>
          <div>
            <label className="block text-sm font-medium text-[#1A2B48]" htmlFor="name">
              Full name
            </label>
            <input
              required
              autoComplete="name"
              className={inputClass}
              defaultValue={stepOne.name}
              id="name"
              name="name"
              type="text"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A2B48]" htmlFor="email">
              Work email
            </label>
            <input
              required
              autoComplete="email"
              className={inputClass}
              defaultValue={stepOne.email}
              id="email"
              inputMode="email"
              name="email"
              type="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A2B48]" htmlFor="practiceName">
              Practice name
            </label>
            <input
              required
              autoComplete="organization"
              className={inputClass}
              defaultValue={stepOne.practiceName}
              id="practiceName"
              name="practiceName"
              type="text"
            />
          </div>
          <button className={buttonPrimaryClass} type="submit">
            Continue
          </button>
        </form>
      ) : (
        <form className="relative mt-6 space-y-5" onSubmit={handleStepTwoSubmit}>
          <p className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">
            {stepOne.name} · {stepOne.practiceName}
          </p>

          <div>
            <label className="block text-sm font-medium text-[#1A2B48]" htmlFor="specialty">
              Specialty
            </label>
            <select required className={selectClass} id="specialty" name="specialty">
              <option value="">Select specialty</option>
              {SPECIALTY_OPTIONS.map((value) => (
                <option key={value} value={value}>
                  {SPECIALTY_LABELS[value]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A2B48]" htmlFor="state">
              State
            </label>
            <select required className={selectClass} id="state" name="state">
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
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A2B48]" htmlFor="disputesPerMonth">
              Monthly OON claim estimate
            </label>
            <select required className={selectClass} id="disputesPerMonth" name="disputesPerMonth">
              <option value="">Select volume</option>
              {DISPUTES_PER_MONTH_OPTIONS.map((value) => (
                <option key={value} value={value}>
                  {DISPUTES_LABELS[value]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A2B48]" htmlFor="idrApproach">
              Current IDR approach
            </label>
            <select required className={selectClass} id="idrApproach" name="idrApproach">
              <option value="">Select approach</option>
              {IDR_APPROACH_OPTIONS.map((value) => (
                <option key={value} value={value}>
                  {IDR_APPROACH_LABELS[value]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A2B48]" htmlFor="eobFile">
              Upload an EOB for the demo (optional)
            </label>
            <input
              accept=".pdf,image/*"
              className="mt-1.5 block w-full text-sm text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#1A2B48]"
              id="eobFile"
              name="eobFile"
              type="file"
            />
            <p className="mt-1.5 text-xs text-slate-500">
              PDF or image. We review it before the call if you upload one.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A2B48]" htmlFor="message">
              Or describe your situation (optional)
            </label>
            <textarea
              className={`${inputClass} min-h-[100px] resize-y`}
              id="message"
              name="message"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A2B48]" htmlFor="tierInterest">
              Tier interest (optional)
            </label>
            <select
              className={selectClass}
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
          </div>

          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
            <label htmlFor="website">Website</label>
            <input autoComplete="off" id="website" name="website" tabIndex={-1} type="text" />
          </div>

          {state.status === "error" ? (
            <div className="text-sm text-red-600" role="alert">
              <p>{state.message}</p>
              <p className="mt-2">
                <a className="font-medium text-[#1A2B48] underline" href={salesMailtoHref()}>
                  {getSalesEmail()}
                </a>
              </p>
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row-reverse">
            <button
              className={`${buttonPrimaryClass} sm:flex-1`}
              disabled={state.status === "submitting"}
              type="submit"
            >
              {state.status === "submitting" ? "Submitting…" : submitLabel}
            </button>
            <button
              className={`${buttonSecondaryClass} sm:flex-1`}
              disabled={state.status === "submitting"}
              type="button"
              onClick={() => setStep(1)}
            >
              Back
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
