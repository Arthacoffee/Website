"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { primaryNav, reserveNav, site } from "@/content/site";
import { useScrolledPast } from "@/hooks/use-scroll-position";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useHeaderVariant } from "@/components/layout/header-variant-context";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export function Header() {
  const scrolled = useScrolledPast(72);
  const { variant } = useHeaderVariant();
  const [open, setOpen] = useState(false);
  useBodyScrollLock(open);

  const isTransparent = variant === "dark-hero" && !scrolled && !open;
  const textTone = isTransparent ? "text-background" : "text-foreground";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ease-[var(--ease-editorial)]",
          isTransparent
            ? "border-b border-transparent bg-transparent"
            : "border-stone bg-background/85 border-b backdrop-blur-md",
        )}
      >
        <Container className="flex h-20 items-center justify-between md:h-24">
          <Link
            href="/"
            className={cn(
              "font-display text-xl font-medium tracking-[0.14em] uppercase",
              textTone,
            )}
          >
            {site.name}
          </Link>

          <nav className={cn("hidden items-center gap-10 md:flex", textTone)}>
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.8125rem] font-medium tracking-[0.04em] uppercase opacity-90 transition-opacity hover:opacity-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button
              href={reserveNav.href}
              variant={isTransparent ? "outline" : "primary"}
              size="sm"
              className={isTransparent ? "text-background" : undefined}
            >
              {reserveNav.label}
            </Button>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={cn("p-2 md:hidden", textTone)}
          >
            {open ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
        </Container>
      </header>

      {/*
        Rendered as a sibling of <header>, not a child: the header's
        backdrop-blur (a `backdrop-filter`) establishes a new containing
        block for any `position: fixed` descendant, which would otherwise
        collapse this panel's height to the header's own ~80px box instead
        of the viewport.
      */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-background fixed inset-0 top-20 z-40 md:hidden"
          >
            <Container as="nav" className="flex flex-col gap-1 pt-6">
              {primaryNav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="border-stone font-display text-coffee block border-b py-5 text-3xl"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-8">
                <Button
                  href={reserveNav.href}
                  onClick={() => setOpen(false)}
                  className="w-full"
                >
                  {reserveNav.label} a Table
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
