"use client";

import { useState } from "react";

import { getSalesEmail, salesMailtoHref } from "@/lib/contact";
import {
  CONTACT_INTENT_OPTIONS,
  CONTACT_INTENT_LABELS,
} from "@/lib/schemas/contact-request";

const inputClass =
  "mt-1.5 min-h-12 w-full rounded-md border border-slate-200 px-3 py-2.5 text-base text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30";

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
      <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-[15px] text-emerald-900">
        We will reply to {email} within one business day.
      </p>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-[#1A2B48]" htmlFor="contact-name">
          Full name
        </label>
        <input required className={inputClass} id="contact-name" name="name" type="text" />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#1A2B48]" htmlFor="contact-email">
          Work email
        </label>
        <input required className={inputClass} id="contact-email" name="email" type="email" />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#1A2B48]" htmlFor="contact-practice">
          Practice name
        </label>
        <input required className={inputClass} id="contact-practice" name="practiceName" type="text" />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#1A2B48]" htmlFor="contact-intent">
          What can we help with?
        </label>
        <select required className={`${inputClass} bg-white`} id="contact-intent" name="intent">
          <option value="">Select topic</option>
          {CONTACT_INTENT_OPTIONS.map((value) => (
            <option key={value} value={value}>
              {CONTACT_INTENT_LABELS[value]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#1A2B48]" htmlFor="contact-message">
          Message (optional)
        </label>
        <textarea
          className={`${inputClass} min-h-[120px] resize-y`}
          id="contact-message"
          name="message"
          rows={4}
        />
      </div>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <input name="website" tabIndex={-1} type="text" />
      </div>
      {status === "error" ? (
        <p className="text-sm text-red-600" role="alert">
          Something went wrong. Email{" "}
          <a className="underline" href={salesMailtoHref()}>
            {getSalesEmail()}
          </a>
        </p>
      ) : null}
      <button
        className="min-h-12 w-full rounded-md bg-[#1A2B48] py-3 text-base font-semibold text-white disabled:opacity-60"
        disabled={status === "submitting"}
        type="submit"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
