import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[var(--content-max)] px-6 md:px-10",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
