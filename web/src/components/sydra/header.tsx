import Image from "next/image";
import Link from "next/link";

const nav = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#proof", label: "Why it works" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

const SIGN_IN = "https://idra-five.vercel.app/login";

export function SydraHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4 sm:px-6 xl:max-w-[1200px] xl:px-8">
        <Link
          className="flex shrink-0 items-center gap-2.5"
          href="#top"
          aria-label="Sydra home"
        >
          <Image
            src="/icon-sydra.svg"
            alt=""
            width={36}
            height={36}
            priority
          />
          <span className="text-lg font-semibold tracking-tight text-[#1A2B48] md:text-xl">
            Sydra
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-center gap-6 lg:flex lg:gap-8"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[#1A2B48] md:text-[15px]"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 sm:gap-4 lg:gap-6">
          <a
            className="text-sm font-medium text-slate-600 hover:text-[#1A2B48]"
            href={SIGN_IN}
            rel="noopener noreferrer"
            target="_blank"
          >
            Sign in
          </a>
          <a
            className="rounded-lg bg-[#1A2B48] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 md:px-5"
            href="#contact"
          >
            Request demo
          </a>
        </div>
      </div>

      <nav
        aria-label="Primary mobile"
        className="flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 px-4 py-3 sm:px-6 lg:hidden xl:max-w-[1200px] xl:mx-auto"
      >
        {nav.map((item) => (
          <a
            key={item.href}
            className="text-sm font-medium text-slate-600"
            href={item.href}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
