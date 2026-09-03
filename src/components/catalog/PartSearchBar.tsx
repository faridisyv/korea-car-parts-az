"use client";

import { useTranslations } from "next-intl";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PartSearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export default function PartSearchBar({ value, onChange }: PartSearchBarProps) {
  const t = useTranslations("catalog");

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
        <Search className="w-5 h-5 text-amber-400" />
      </div>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("searchPlaceholder")}
        className="pl-12 pr-10 py-6 text-sm sm:text-base rounded-2xl glass-input bg-zinc-950/70 border-white/15 focus:border-amber-500 text-white placeholder:text-zinc-500 shadow-inner"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
