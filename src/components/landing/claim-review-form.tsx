"use client";

import { useId, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";

import { Button } from "@/components/ui/button";
import { editorialInputClass, FormField } from "@/components/ui/form-field";
import { SALES_EMAIL_FALLBACK } from "@/lib/contact";

type ClaimReviewFormProps = {
  source?: string;
};

type FieldErrors = {
  email?: string;
  practiceName?: string;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ClaimReviewForm({ source }: ClaimReviewFormProps) {
  const id = useId();
  const emailId = `${id}-email`;
  const practiceId = `${id}-practice`;
  const websiteId = `${id}-website`;

  const [email, setEmail] = useState("");
  const [practiceName, setPracticeName] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    const trimmedEmail = email.trim();
    const trimmedPractice = practiceName.trim();
    if (!trimmedEmail) next.email = "Enter a work email.";
    else if (!isValidEmail(trimmedEmail)) next.email = "Enter a valid work email.";
    if (!trimmedPractice) next.practiceName = "Enter your practice name.";
    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setFormError(null);
    if (nextErrors.email || nextErrors.practiceName) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/claim-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          practiceName: practiceName.trim(),
          source: source ?? "",
          website,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || data.ok === false) {
        setFormError(
          data.error ||
            `Something went wrong. Please try again or email ${SALES_EMAIL_FALLBACK}.`,
        );
        return;
      }
      setSucceeded(true);
      track("claim_review_submitted", { source: source ?? "" });
    } catch {
      setFormError(`Something went wrong. Please try again or email ${SALES_EMAIL_FALLBACK}.`);
    } finally {
      setSubmitting(false);
    }
  };

  if (succeeded) {
    return (
      <div className="space-y-4" role="status">
        <p className="type-body text-brand">
          {`Got it — check your inbox. We've sent you a sample review so you can see exactly what you'll get back.`}
        </p>
        <p className="type-body text-brand">
          Someone from Sydra will follow up personally within one business day. If you&apos;d like a
          review on your own claim before then, reply to that email with one denied EOB attached.
        </p>
      </div>
    );
  }

  return (
    <form className="relative space-y-6" onSubmit={handleSubmit} noValidate>
      <FormField id={emailId} label="Work email" required>
        <input
          required
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? `${emailId}-error` : undefined}
          autoComplete="email"
          className={editorialInputClass}
          id={emailId}
          inputMode="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email ? (
          <p className="mt-2 text-sm text-red-700" id={`${emailId}-error`} role="alert">
            {errors.email}
          </p>
        ) : null}
      </FormField>

      <FormField id={practiceId} label="Practice name" required>
        <input
          required
          aria-invalid={errors.practiceName ? true : undefined}
          aria-describedby={errors.practiceName ? `${practiceId}-error` : undefined}
          autoComplete="organization"
          className={editorialInputClass}
          id={practiceId}
          name="practiceName"
          type="text"
          value={practiceName}
          onChange={(e) => setPracticeName(e.target.value)}
        />
        {errors.practiceName ? (
          <p className="mt-2 text-sm text-red-700" id={`${practiceId}-error`} role="alert">
            {errors.practiceName}
          </p>
        ) : null}
      </FormField>

      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor={websiteId}>Website</label>
        <input
          autoComplete="off"
          id={websiteId}
          name="website"
          tabIndex={-1}
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {formError ? (
        <p className="text-sm text-red-700" role="alert">
          {formError}
        </p>
      ) : null}

      <Button className="w-full sm:w-auto" disabled={submitting} showArrow type="submit">
        {submitting ? "Sending…" : "Send me my claim review"}
      </Button>
      <p className="text-[13px] leading-snug text-body/80">
        Takes about a minute. No patient data needed — we&apos;ll show you exactly what to redact. We
        don&apos;t contact your payer.
      </p>
    </form>
  );
}
