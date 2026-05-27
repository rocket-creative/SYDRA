import Link from "next/link";

const TRUST_ITEMS = [
  "BAA available for covered entities",
  "AWS healthcare workloads",
  "Encrypted in transit and at rest",
  "Tenant isolation and audit logging",
] as const;

export function TrustStrip() {
  return (
    <section
      aria-label="Security and compliance overview"
      className="border-b border-slate-200 bg-white py-6 md:py-8"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 xl:max-w-[1200px] xl:px-8">
        <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8 sm:gap-y-2">
          {TRUST_ITEMS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-sm text-[#4A5568] sm:text-[15px]"
            >
              <span
                className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-700"
                aria-hidden
              >
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center text-sm">
          <Link
            className="font-semibold text-[rgb(0,40,184)] underline decoration-blue-200 underline-offset-4 hover:decoration-[rgb(0,40,184)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            href="/security"
          >
            Security and compliance →
          </Link>
        </p>
      </div>
    </section>
  );
}
