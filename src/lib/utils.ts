import { clsx, type ClassValue } from "clsx";

/** Merge conditional class names. Thin wrapper so call sites read as `cn(...)`. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
