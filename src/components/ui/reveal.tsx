"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  /** "up" (default) — subtle rise + fade + blur. "scale" — soft zoom-in + fade. */
  kind?: "up" | "scale" | "fade";
};

/**
 * Standard section-entrance animation: fade + blur + a small slide. Never
 * bounces, never spins, and always resolves within 0.8s. Fully inert when
 * the visitor prefers reduced motion.
 */
export function Reveal({ children, className, delay = 0, id, kind = "up" }: RevealProps) {
  const reduceMotion = useReducedMotion();

  // Reduced-motion variants must explicitly reset every property the
  // animated variants below can set — otherwise a value from the
  // server-rendered "hidden" state (e.g. filter/transform) can survive
  // hydration untouched, since Framer Motion only updates properties a
  // variant actually declares.
  const variants: Variants = reduceMotion
    ? {
        hidden: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
        show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
      }
    : {
        hidden: {
          opacity: 0,
          y: kind === "up" ? 28 : 0,
          scale: kind === "scale" ? 0.97 : 1,
          filter: "blur(10px)",
        },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0.8, delay, ease: EASE },
        },
      };

  return (
    <motion.div
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
