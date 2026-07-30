import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function FormField({
  id,
  label,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-caption text-coffee font-medium">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-caption text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const inputClasses =
  "w-full border border-stone bg-background px-4 py-3 text-body text-foreground outline-none transition-colors focus:border-bronze-ink rounded-[var(--radius-editorial)]";
