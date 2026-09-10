"use client";

import { useTranslations } from "next-intl";
import { Filter, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PartFiltersProps {
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedLocation: string;
  onSelectLocation: (loc: string) => void;
  sortBy: string;
  onSelectSortBy: (sort: string) => void;
  onReset: () => void;
}

const BRANDS = ["All", "Hyundai", "Kia", "Genesis"];

const CATEGORIES = [
  { id: "all", labelKey: "allCategories" },
  { id: "engine", labelKey: "engine" },
  { id: "brakes", labelKey: "brakes" },
  { id: "suspension", labelKey: "suspension" },
  { id: "electrical", labelKey: "electrical" },
  { id: "body", labelKey: "body" },
  { id: "filters", labelKey: "filters" },
  { id: "transmission", labelKey: "transmission" },
];

export default function PartFilters({
  selectedBrand,
  onSelectBrand,
  selectedCategory,
  onSelectCategory,
  selectedLocation,
  onSelectLocation,
  sortBy,
  onSelectSortBy,
  onReset,
}: PartFiltersProps) {
  const t = useTranslations("catalog");
  const tCat = useTranslations("categories");

  return (
    <div className="space-y-6 rounded-2xl bg-white p-6 border border-slate-200/80 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-900">
          <Filter className="w-4 h-4 text-blue-600" />
          <span>Filters & Sort</span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600 transition-colors font-medium"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{t("resetFilters")}</span>
        </button>
      </div>

      {/* Brand Selection Pills */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
          {t("filterBrand")}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {BRANDS.map((brand) => {
            const isSelected =
              (brand === "All" && selectedBrand === "") ||
              selectedBrand === brand;
            return (
              <button
                key={brand}
                onClick={() => onSelectBrand(brand === "All" ? "" : brand)}
                className={`py-2 px-3 rounded-xl text-xs font-bold tracking-wide transition-all ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/70"
                }`}
              >
                {brand === "All" ? t("allBrands") : brand}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Selection */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
          {t("filterCategory")}
        </label>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const isSelected =
              (cat.id === "all" && selectedCategory === "") ||
              selectedCategory === cat.id;
            const label =
              cat.id === "all"
                ? t("allCategories")
                : tCat(cat.id as any);

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id === "all" ? "" : cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-blue-50 text-blue-700 font-bold border border-blue-200"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span>{label}</span>
                {isSelected && (
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Location / Stock Filter */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
          {t("filterStock")}
        </label>
        <div className="space-y-1.5">
          {[
            { id: "", label: t("allStock") },
            { id: "baku", label: t("inBaku") },
            { id: "seoul", label: t("inKorea") },
          ].map((loc) => {
            const isSelected = selectedLocation === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => onSelectLocation(loc.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all ${
                  isSelected
                    ? "bg-blue-50 text-blue-700 font-bold border border-blue-200"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {loc.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort By */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
          {t("sortBy")}
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSelectSortBy(e.target.value)}
          className="w-full rounded-xl bg-white border border-slate-200 px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-sm"
        >
          <option value="newest">{t("newest")}</option>
          <option value="price_asc">{t("priceAsc")}</option>
          <option value="price_desc">{t("priceDesc")}</option>
        </select>
      </div>
    </div>
  );
}
