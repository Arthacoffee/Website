"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { HeaderOverDarkHero } from "@/components/layout/header-variant-context";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site, reserveNav } from "@/content/site";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Cinematic homepage hero. Pass `videoSrc`/`posterSrc` once real footage
 * exists — it swaps in with no layout change; until then a brand-toned
 * gradient carries the moment instead of a stock image.
 */
export function Hero({ videoSrc, posterSrc }: { videoSrc?: string; posterSrc?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-dvh items-end overflow-hidden bg-coffee text-background">
      <HeaderOverDarkHero />

      <div className="absolute inset-0">
        {videoSrc ? (
          <video
            className="h-full w-full object-cover"
            src={videoSrc}
            poster={posterSrc}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(120% 90% at 15% 0%, #4a3527 0%, transparent 55%), radial-gradient(100% 80% at 85% 100%, #56624f 0%, transparent 50%), linear-gradient(160deg, #241a14 0%, #150e0a 100%)",
            }}
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#150e0a] via-[#150e0a]/40 to-[#150e0a]/10" />
      </div>

      <Container className="relative z-10 pt-40 pb-24 md:pb-28">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-display text-xl italic text-bronze-light md:text-2xl"
        >
          {site.tagline}
        </motion.p>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="mt-4 font-display text-hero leading-[0.98] font-medium tracking-tight text-background"
        >
          Coffee.
          <br />
          Craft.
          <br />
          Conversation.
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          className="mt-8 max-w-xl text-body-lg text-background/80"
        >
          A destination for specialty coffee, thoughtful vegetarian food, and unhurried
          moments — three levels and a rooftop terrace on Defence Colony Road, Sainikpuri.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <Button href={reserveNav.href} variant="primary">
            Reserve a Table
          </Button>
          <a
            href="#why-we-exist"
            className="text-[0.8125rem] font-medium tracking-[0.04em] text-background/85 uppercase underline decoration-1 underline-offset-4 decoration-background/40 transition-colors hover:decoration-background"
          >
            Explore
          </a>
        </motion.div>
      </Container>

      <motion.a
        href="#why-we-exist"
        aria-label="Scroll to explore"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-background/60 md:flex"
      >
        <span className="text-caption tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown size={16} aria-hidden="true" />
      </motion.a>
    </section>
  );
}
