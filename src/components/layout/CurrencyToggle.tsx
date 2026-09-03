"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Currency = "USD" | "AZN";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (usdAmount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  setCurrency: () => {},
  formatPrice: (amount: number) => `$${amount}`,
});

export const USD_TO_AZN_RATE = 1.70;

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    const saved = localStorage.getItem("preferred_currency") as Currency;
    if (saved === "USD" || saved === "AZN") {
      setCurrency(saved);
    }
  }, []);

  const handleSetCurrency = (c: Currency) => {
    setCurrency(c);
    localStorage.setItem("preferred_currency", c);
  };

  const formatPrice = (usdAmount: number) => {
    if (currency === "AZN") {
      const aznAmount = Math.round(usdAmount * USD_TO_AZN_RATE);
      return `${aznAmount} ₼`;
    }
    return `$${usdAmount.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency: handleSetCurrency, formatPrice }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

export default function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-0.5 text-xs font-bold">
      <button
        onClick={() => setCurrency("USD")}
        className={`px-2.5 py-1.5 rounded-lg transition-all ${
          currency === "USD"
            ? "bg-amber-500 text-black shadow-md"
            : "text-zinc-400 hover:text-white"
        }`}
      >
        USD ($)
      </button>
      <button
        onClick={() => setCurrency("AZN")}
        className={`px-2.5 py-1.5 rounded-lg transition-all ${
          currency === "AZN"
            ? "bg-amber-500 text-black shadow-md"
            : "text-zinc-400 hover:text-white"
        }`}
      >
        AZN (₼)
      </button>
    </div>
  );
}
