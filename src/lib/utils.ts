import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Formats a number with locale-aware thousands separators, e.g. 10000 -> "10,000". */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(Math.round(value))
}

/** Clamps a number between a minimum and maximum. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
