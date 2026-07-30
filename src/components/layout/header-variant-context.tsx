"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type HeaderVariant = "light" | "dark-hero";

const HeaderVariantContext = createContext<{
  variant: HeaderVariant;
  setVariant: (variant: HeaderVariant) => void;
} | null>(null);

export function HeaderVariantProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<HeaderVariant>("light");
  return (
    <HeaderVariantContext.Provider value={{ variant, setVariant }}>
      {children}
    </HeaderVariantContext.Provider>
  );
}

export function useHeaderVariant() {
  const ctx = useContext(HeaderVariantContext);
  if (!ctx) throw new Error("useHeaderVariant must be used within HeaderVariantProvider");
  return ctx;
}

/**
 * Drop this at the top of a page whose hero should sit under a transparent,
 * light-text header (e.g. a cinematic dark hero). Resets to "light" on
 * unmount so navigating away restores the default chrome.
 */
export function HeaderOverDarkHero() {
  const { setVariant } = useHeaderVariant();
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    setVariant("dark-hero");
    return () => {
      if (mounted.current) setVariant("light");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
