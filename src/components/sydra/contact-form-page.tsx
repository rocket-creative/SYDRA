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
  CONTACT_INTENT_OPTIONS,
  CONTACT_INTENT_LABELS,
} from "@/lib/schemas/contact-request";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [email, setEmail] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    const formData = new FormData(event.currentTarget);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      practiceName: formData.get("practiceName"),
      intent: formData.get("intent"),
      message: formData.get("message") ?? "",
      website: formData.get("website") ?? "",
    };

    try {
      const res = await fetch("/api/contact", {
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
        We&apos;ll reply to {email} within one business day.
      </p>
    );
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <FormField id="contact-name" label="Full name" required>
        <input required aria-required="true" className={editorialInputClass} id="contact-name" name="name" type="text" />
      </FormField>
      <FormField id="contact-email" label="Work email" required>
        <input required aria-required="true" className={editorialInputClass} id="contact-email" name="email" type="email" />
      </FormField>
      <FormField id="contact-practice" label="Practice name" required>
        <input
          required
          aria-required="true"
          className={editorialInputClass}
          id="contact-practice"
          name="practiceName"
          type="text"
        />
      </FormField>
      <FormField id="contact-intent" label="What can we help with?" required>
        <select required aria-required="true" className={editorialSelectClass} id="contact-intent" name="intent">
          <option value="">Select topic</option>
          {CONTACT_INTENT_OPTIONS.map((value) => (
            <option key={value} value={value}>
              {CONTACT_INTENT_LABELS[value]}
            </option>
          ))}
        </select>
      </FormField>
      <FormField id="contact-message" label="Message (optional)">
        <textarea
          className={`${editorialInputClass} min-h-[120px] resize-y`}
          id="contact-message"
          name="message"
          rows={4}
        />
      </FormField>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <input name="website" tabIndex={-1} type="text" />
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
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
