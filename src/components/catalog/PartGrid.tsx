"use client";

import { useTranslations } from "next-intl";
import PartCard, { type PartItem } from "./PartCard";
import { PackageSearch, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PartGridProps {
  parts: PartItem[];
  isLoading?: boolean;
  onResetFilters?: () => void;
}

export default function PartGrid({
  parts,
  isLoading = false,
  onResetFilters,
}: PartGridProps) {
  const t = useTranslations("catalog");

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className="rounded-2xl glass-panel h-80 animate-pulse flex flex-col p-4 space-y-4"
          >
            <div className="h-40 bg-white/5 rounded-xl" />
            <div className="h-4 bg-white/10 rounded w-3/4" />
            <div className="h-4 bg-white/5 rounded w-1/2" />
            <div className="h-8 bg-white/10 rounded-xl mt-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (parts.length === 0) {
    return (
      <div className="rounded-3xl glass-panel p-12 text-center space-y-4 max-w-lg mx-auto my-12 border border-white/10">
        <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto text-amber-400">
          <PackageSearch className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white">{t("noResults")}</h3>
          <p className="text-xs text-zinc-400">
            Can't find the exact part? Request any OEM part number directly using our VIN request popup.
          </p>
        </div>
        {onResetFilters && (
          <Button
            onClick={onResetFilters}
            variant="outline"
            size="sm"
            className="mt-2"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-2" />
            {t("resetFilters")}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {parts.map((part) => (
        <PartCard key={part.id} part={part} />
      ))}
    </div>
  );
}
