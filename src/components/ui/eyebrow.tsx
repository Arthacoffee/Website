import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-caption text-bronze-ink block font-medium tracking-[0.2em] uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
