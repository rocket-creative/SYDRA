"use client";

import type { FormEvent } from "react";
import { useCallback, useState } from "react";

import { contactMailtoHref, formatContactEmailMasked } from "@/lib/contact";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

export function SydraContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ status: "submitting" });
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      practiceName: formData.get("practiceName"),
      email: formData.get("email"),
      phone: formData.get("phone") ?? "",
      message: formData.get("message") ?? "",
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
      setState({ status: "success" });
      event.currentTarget.reset();
    } catch {
      setState({
        status: "error",
        message: "Network error. Check your connection and try again.",
      });
    }
  }, []);

  return (
    <section className="bg-white py-16 md:py-24" id="contact" aria-labelledby="heading-contact">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-[640px] xl:px-8">
        <h2
          className="text-center text-[1.55rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl"
          id="heading-contact"
        >
          Ready to recover what insurers owe you?
        </h2>
        <p className="mt-5 text-center text-base leading-relaxed text-[#4A5568] md:text-[17px]">
          Show us a recent denied claim. We will walk you through what Sydra
          would have generated, in under 30 minutes, with no commitment.
        </p>

        {state.status === "success" ? (
          <p
            className="mt-10 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-4 text-center text-[15px] text-emerald-900"
            role="status"
          >
            Thank you. We received your request and will be in touch shortly.
          </p>
        ) : (
          <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-[#1A2B48]" htmlFor="name">
                Your name
              </label>
              <input
                required
                aria-required="true"
                autoComplete="name"
                className="mt-1.5 min-h-12 w-full rounded-md border border-slate-200 px-3 py-2.5 text-base text-slate-900 outline-none ring-offset-2 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                id="name"
                name="name"
                type="text"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-[#1A2B48]"
                htmlFor="practiceName"
              >
                Practice name
              </label>
              <input
                required
                aria-required="true"
                autoComplete="organization"
                className="mt-1.5 min-h-12 w-full rounded-md border border-slate-200 px-3 py-2.5 text-base text-slate-900 outline-none ring-offset-2 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                id="practiceName"
                name="practiceName"
                type="text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1A2B48]" htmlFor="email">
                Email
              </label>
              <input
                required
                aria-required="true"
                autoComplete="email"
                className="mt-1.5 min-h-12 w-full rounded-md border border-slate-200 px-3 py-2.5 text-base text-slate-900 outline-none ring-offset-2 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                id="email"
                inputMode="email"
                name="email"
                type="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1A2B48]" htmlFor="phone">
                Phone (optional)
              </label>
              <input
                autoComplete="tel"
                className="mt-1.5 min-h-12 w-full rounded-md border border-slate-200 px-3 py-2.5 text-base text-slate-900 outline-none ring-offset-2 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                id="phone"
                inputMode="tel"
                name="phone"
                type="tel"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-[#1A2B48]"
                htmlFor="message"
              >
                What would you like to know?
              </label>
              <textarea
                className="mt-1.5 min-h-[120px] w-full resize-y rounded-md border border-slate-200 px-3 py-2.5 text-base text-slate-900 outline-none ring-offset-2 transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                id="message"
                inputMode="text"
                name="message"
                rows={4}
              />
            </div>

            {state.status === "error" ? (
              <div className="text-sm text-red-600" role="alert">
                <p>{state.message}</p>
                <p className="mt-2">
                  <a
                    className="font-medium text-[#1A2B48] underline decoration-slate-300 underline-offset-2 transition-colors duration-300 hover:decoration-[#1A2B48]"
                    href={contactMailtoHref()}
                  >
                    {formatContactEmailMasked()}
                  </a>
                </p>
              </div>
            ) : null}

            <button
              className="min-h-12 w-full rounded-md bg-[#1A2B48] py-3 text-base font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition duration-300 ease-out hover:opacity-[0.92] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:opacity-60 disabled:active:scale-100"
              disabled={state.status === "submitting"}
              type="submit"
            >
              {state.status === "submitting" ? "Sending…" : "Request demo"}
            </button>
            <p className="text-center text-xs text-slate-500 md:text-sm">
              By submitting you agree to be contacted by Kronos Health about
              Sydra. We do not share your information.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
