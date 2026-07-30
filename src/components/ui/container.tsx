import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType> = {
  children: ReactNode;
  className?: string;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "children" | "className" | "as">;

export function Container<T extends ElementType = "div">({
  children,
  className,
  as,
  ...rest
}: ContainerProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[var(--content-max)] px-6 md:px-10",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
