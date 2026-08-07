"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  editorialInputClass,
  editorialSelectClass,
  FormField,
} from "@/components/ui/form-field";
import { getSalesEmail, salesMailtoHref } from "@/lib/contact";
import {
  PRIVACY_REQUEST_LABELS,
  PRIVACY_REQUEST_TYPES,
} from "@/lib/schemas/privacy-request";

export function PrivacyRequestForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [email, setEmail] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    const formData = new FormData(event.currentTarget);

    const payload = {
      name: formData.get("name") ?? "",
      email: formData.get("email"),
      requestType: formData.get("requestType"),
      message: formData.get("message") ?? "",
      website: formData.get("website") ?? "",
    };

    try {
      const res = await fetch("/api/privacy-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setEmail(String(formData.get("email") ?? ""));
      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="border-l-2 border-[var(--color-hero)] py-2 pl-4 text-[15px] text-brand">
        Request received for {email}. We will process it promptly and confirm by email if needed.
      </p>
    );
  }

  return (
    <form className="relative space-y-8" onSubmit={handleSubmit}>
      <FormField id="privacy-email" label="Email address" required>
        <input
          required
          aria-required="true"
          autoComplete="email"
          className={editorialInputClass}
          id="privacy-email"
          inputMode="email"
          name="email"
          type="email"
        />
      </FormField>
      <FormField id="privacy-name" label="Full name">
        <input
          autoComplete="name"
          className={editorialInputClass}
          id="privacy-name"
          name="name"
          type="text"
        />
      </FormField>
      <FormField id="privacy-request-type" label="Request type" required>
        <select
          required
          aria-required="true"
          className={editorialSelectClass}
          defaultValue="do_not_sell_or_share"
          id="privacy-request-type"
          name="requestType"
        >
          {PRIVACY_REQUEST_TYPES.map((value) => (
            <option key={value} value={value}>
              {PRIVACY_REQUEST_LABELS[value]}
            </option>
          ))}
        </select>
      </FormField>
      <FormField id="privacy-message" label="Additional details">
        <textarea
          className={`${editorialInputClass} min-h-[100px] resize-y`}
          id="privacy-message"
          name="message"
          rows={3}
        />
      </FormField>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="privacy-website">Website</label>
        <input
          autoComplete="off"
          id="privacy-website"
          name="website"
          tabIndex={-1}
          type="text"
        />
      </div>
      {status === "error" ? (
        <p className="text-sm text-red-700" role="alert">
          Something went wrong. Email{" "}
          <a className="underline" href={salesMailtoHref()}>
            {getSalesEmail()}
          </a>
        </p>
      ) : null}
      <Button
        className="w-full sm:w-auto"
        disabled={status === "submitting"}
        showArrow
        type="submit"
      >
        {status === "submitting" ? "Sending…" : "Submit request"}
      </Button>
    </form>
  );
}
