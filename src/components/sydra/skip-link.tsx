export function SkipLink() {
  return (
    <a
      className="fixed left-4 top-[-100px] z-[100] min-h-11 min-w-11 rounded-md bg-[#1A2B48] px-4 py-3 text-sm text-white outline-none ring-offset-2 transition-all duration-300 ease-out focus:top-[max(1rem,env(safe-area-inset-top))] focus-visible:ring-2 focus-visible:ring-blue-500"
      href="#main-content"
    >
      Skip to main content
    </a>
  );
}
