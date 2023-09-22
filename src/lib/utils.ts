import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function round2(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}
