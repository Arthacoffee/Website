export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="focus:bg-coffee focus:text-background sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-[var(--radius-editorial)] focus:px-5 focus:py-3 focus:text-sm focus:font-medium"
    >
      Skip to content
    </a>
  );
}
