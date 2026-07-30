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
        "block text-caption font-medium tracking-[0.2em] text-bronze-ink uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
