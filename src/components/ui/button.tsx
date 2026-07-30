import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "text";
type Size = "md" | "sm";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-medium tracking-[0.02em] transition-colors duration-300 ease-[var(--ease-editorial)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coffee disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-coffee text-background hover:bg-bronze-ink rounded-[var(--radius-editorial)] px-8 py-3.5 text-[0.8125rem] uppercase",
  outline:
    "border border-current rounded-[var(--radius-editorial)] px-8 py-3.5 text-[0.8125rem] uppercase hover:bg-current/10",
  text: "text-current underline decoration-1 underline-offset-4 decoration-current/40 hover:decoration-current text-[0.875rem]",
};

const sizes: Record<Size, string> = {
  md: "",
  sm: "px-5 py-2.5 text-[0.75rem]",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", children, className, icon } = props;
  const classes = cn(
    base,
    variants[variant],
    variant !== "text" && sizes[size],
    className,
  );

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        target={props.target}
        rel={props.rel}
        onClick={props.onClick}
        className={classes}
      >
        {children}
        {icon}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button {...buttonProps} className={classes}>
      {children}
      {icon}
    </button>
  );
}
