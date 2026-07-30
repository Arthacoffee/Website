"use client";

import { useEffect, useState } from "react";

/**
 * True once the page has scrolled past `threshold` px. Used to switch the
 * header from transparent-over-hero to a blurred, opaque bar.
 */
export function useScrolledPast(threshold = 72) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
