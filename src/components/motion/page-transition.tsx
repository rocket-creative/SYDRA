"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Subtle opacity + upward fade on route change.
 * Wraps page content — not the nav.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional fade-out on route change, restored on next frame
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 40);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(6px)",
        transition:
          "opacity 400ms cubic-bezier(0.16,1,0.3,1), transform 400ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {children}
    </div>
  );
}
