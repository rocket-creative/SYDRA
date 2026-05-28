import { Button } from "@/components/ui/button";
import { getContactPhoneDisplay, getContactPhoneTel } from "@/lib/contact";

export function MobileCtaBar() {
  const phone = getContactPhoneDisplay();
  const phoneTel = getContactPhoneTel();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-rule bg-white lg:hidden">
      <div className="mx-auto flex max-w-[1280px] gap-2 px-6 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
        {phone && phoneTel ? (
          <Button className="flex-1 !px-4" href={phoneTel} variant="ghost">
            Call
          </Button>
        ) : null}
        <Button className="flex-[2]" href="/demo" showArrow>
          Schedule a demo
        </Button>
      </div>
    </div>
  );
}
