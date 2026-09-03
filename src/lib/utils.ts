import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Exchange rate USD to AZN (approx 1 USD = 1.70 AZN)
export const USD_TO_AZN_RATE = 1.70;

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatAZN(amount: number): string {
  return `${(amount * USD_TO_AZN_RATE).toFixed(0)} ₼`;
}

export function isValidVIN(vin: string): boolean {
  if (!vin) return false;
  const cleanVin = vin.trim().toUpperCase();
  // Standard 17-character VIN (excludes I, O, Q)
  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
  return vinRegex.test(cleanVin);
}

export function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "new":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    case "in_review":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "quoted":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "ordered":
      return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
    case "shipped":
      return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30";
    case "fulfilled":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "closed":
      return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30";
    default:
      return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30";
  }
}
