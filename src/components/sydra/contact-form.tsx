import Link from "next/link";

import {
  getContactPhoneDisplay,
  getContactPhoneTel,
  getSalesEmail,
  salesMailtoHref,
} from "@/lib/contact";

export function SydraContactForm() {
  const phone = getContactPhoneDisplay();
  const phoneTel = getContactPhoneTel();

  return (
    <section className="bg-white py-16 md:py-24" id="contact" aria-labelledby="heading-contact">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 xl:max-w-[640px] xl:px-8">
        <h2
          className="text-[1.55rem] font-semibold tracking-tight text-[#1A2B48] sm:text-3xl"
          id="heading-contact"
        >
          Ready to see Sydra on a real claim?
        </h2>
        <p className="mt-5 text-base leading-relaxed text-[#4A5568] md:text-[17px]">
          Schedule a 15 minute demo. We walk through Sydra live on a denied claim,
          recommend the right tier, and quote on your volume. No pressure.
        </p>
        <Link
          className="mt-10 inline-flex min-h-12 w-full max-w-sm items-center justify-center rounded-md bg-[#1A2B48] px-8 py-3 text-base font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition duration-300 ease-out hover:opacity-[0.92] active:scale-[0.99] sm:w-auto"
          href="/demo"
        >
          Schedule a demo
        </Link>
        <p className="mt-6 text-sm text-slate-500">
          Prefer email?{" "}
          <a
            className="font-medium text-[#1A2B48] underline decoration-slate-300 underline-offset-2 hover:decoration-[#1A2B48]"
            href={salesMailtoHref()}
          >
            {getSalesEmail()}
          </a>
        </p>
        {phone && phoneTel ? (
          <p className="mt-3 text-sm text-slate-500">
            Or call{" "}
            <a
              className="font-medium text-[#1A2B48] underline decoration-slate-300 underline-offset-2 hover:decoration-[#1A2B48] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              href={phoneTel}
            >
              {phone}
            </a>
            {" · "}
            9:00 to 5:00 ET, Monday through Friday
          </p>
        ) : null}
        <p className="mt-4">
          <Link
            className="text-sm font-semibold text-[rgb(0,40,184)] underline decoration-blue-200 underline-offset-4 hover:decoration-[rgb(0,40,184)]"
            href="/contact"
          >
            Sales and support contact paths →
          </Link>
        </p>
      </div>
    </section>
  );
}
