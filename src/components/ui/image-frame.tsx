import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ImageCategory =
  "interior" | "coffee" | "kitchen" | "terrace" | "people" | "lifestyle";

const categoryGradients: Record<ImageCategory, string> = {
  interior: "linear-gradient(155deg, #3a2c25 0%, #1c140f 100%)",
  coffee: "linear-gradient(155deg, #4a3527 0%, #241a14 100%)",
  kitchen: "linear-gradient(155deg, #56624f 0%, #2c332a 100%)",
  terrace: "linear-gradient(155deg, #b88a44 0%, #6e4f22 100%)",
  people: "linear-gradient(155deg, #3a2c25 0%, #56624f 100%)",
  lifestyle: "linear-gradient(155deg, #ece7e2 0%, #b88a44 120%)",
};

const HOVER_SCALE =
  "transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.045]";

type ImageFrameProps = {
  category: ImageCategory;
  icon?: LucideIcon;
  className?: string;
  /** Real photography, once available. Falls back to a brand-toned frame when omitted. */
  src?: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
  /**
   * Set when this frame sits inside a `group` link/card and should get the
   * slow, subtle editorial hover-zoom (Kinfolk/Aesop pattern) rather than
   * sitting static. Omit for non-interactive placements (e.g. a SplitFeature
   * image next to static text) where a hover state would imply an action
   * that isn't there.
   */
  interactive?: boolean;
};

/**
 * Reusable photography slot. Pass `src`/`alt` once real photography exists
 * and it renders through next/image with no layout change; until then it
 * renders a considered, brand-toned frame instead of a broken image or a
 * stock placeholder.
 */
export function ImageFrame({
  category,
  icon: Icon,
  className,
  src,
  alt = "",
  priority,
  sizes = "100vw",
  interactive = false,
}: ImageFrameProps) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", interactive && HOVER_SCALE)}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      className={cn("relative overflow-hidden", className)}
    >
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center",
          interactive && HOVER_SCALE,
        )}
        style={{ backgroundImage: categoryGradients[category] }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        {Icon ? (
          <Icon className="text-background/50 relative h-10 w-10" strokeWidth={1.1} />
        ) : null}
      </div>
    </div>
  );
}
