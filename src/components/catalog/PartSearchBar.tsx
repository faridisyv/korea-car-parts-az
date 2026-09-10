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
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
        <Search className="w-5 h-5 text-blue-600" />
      </div>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("searchPlaceholder")}
        className="pl-12 pr-10 py-6 text-sm sm:text-base rounded-2xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400 shadow-sm"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-700"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
