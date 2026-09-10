"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import PartSearchBar from "@/components/catalog/PartSearchBar";
import PartFilters from "@/components/catalog/PartFilters";
import PartGrid from "@/components/catalog/PartGrid";
import { type PartItem } from "@/components/catalog/PartCard";
import { Sparkles, PackageCheck } from "lucide-react";
import { useRequestModal } from "@/components/request/RequestModalContext";
import { Button } from "@/components/ui/button";

export default function CatalogClient({
  initialParts,
}: {
  initialParts: PartItem[];
}) {
  const t = useTranslations("catalog");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const { openRequestModal } = useRequestModal();

  const queryParam = searchParams.get("q") || "";
  const brandParam = searchParams.get("brand") || "";
  const categoryParam = searchParams.get("category") || "";

  const [search, setSearch] = useState(queryParam);
  const [selectedBrand, setSelectedBrand] = useState(brandParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    if (queryParam) setSearch(queryParam);
    if (brandParam) setSelectedBrand(brandParam);
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [queryParam, brandParam, categoryParam]);

  const handleReset = () => {
    setSearch("");
    setSelectedBrand("");
    setSelectedCategory("");
    setSelectedLocation("");
    setSortBy("newest");
  };

  const filteredParts = useMemo(() => {
    return initialParts
      .filter((part) => {
        // Search term in partNumber, brand, compatibleModels, or localized name/desc
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchPartNumber = part.partNumber.toLowerCase().includes(q);
          const matchBrand = part.brand.toLowerCase().includes(q);
          const matchModels = part.compatibleModels.toLowerCase().includes(q);
          let matchTranslation = false;
          try {
            const trans = JSON.parse(part.translations);
            const loc = trans[locale] || trans["en"] || trans["az"];
            if (loc) {
              matchTranslation =
                (loc.name && loc.name.toLowerCase().includes(q)) ||
                (loc.desc && loc.desc.toLowerCase().includes(q));
            }
          } catch {}

          if (!matchPartNumber && !matchBrand && !matchModels && !matchTranslation) {
            return false;
          }
        }

        // Brand filter
        if (selectedBrand && part.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
          return false;
        }

        // Category filter
        if (selectedCategory && part.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }

        // Location filter
        if (selectedLocation) {
          if (
            selectedLocation === "baku" &&
            !part.location.toLowerCase().includes("baku")
          ) {
            return false;
          }
          if (
            selectedLocation === "seoul" &&
            !part.location.toLowerCase().includes("seoul")
          ) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") return a.priceUSD - b.priceUSD;
        if (sortBy === "price_desc") return b.priceUSD - a.priceUSD;
        return 0; // default newest
      });
  }, [
    initialParts,
    search,
    selectedBrand,
    selectedCategory,
    selectedLocation,
    sortBy,
    locale,
  ]);

  return (
    <div className="container max-w-7xl mx-auto px-4 pt-32 pb-24 space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl bg-white p-8 sm:p-12 border border-slate-200/80 shadow-sm relative overflow-hidden bg-gradient-to-br from-blue-50/60 via-white to-slate-50">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <PackageCheck className="w-3.5 h-3.5" />
            Direct Factory Inventory
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t("subtitle")}
          </p>

          <div className="pt-2">
            <PartSearchBar value={search} onChange={setSearch} />
          </div>
        </div>
      </div>

      {/* Main Catalog View: Filters Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Filters Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3">
          <PartFilters
            selectedBrand={selectedBrand}
            onSelectBrand={setSelectedBrand}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedLocation={selectedLocation}
            onSelectLocation={setSelectedLocation}
            sortBy={sortBy}
            onSelectSortBy={setSortBy}
            onReset={handleReset}
          />

          {/* Quick Request Box in Sidebar */}
          <div className="mt-6 rounded-2xl bg-white p-6 border border-slate-200/80 shadow-sm text-center space-y-3">
            <h4 className="text-sm font-bold text-slate-900">
              Looking for another part?
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              We can source any Mobis part by VIN code within 15 minutes.
            </p>
            <Button
              onClick={() => openRequestModal()}
              variant="default"
              size="sm"
              className="w-full text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Request Custom Part
            </Button>
          </div>
        </div>

        {/* Right Parts Grid */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-mono text-slate-500">
              Showing <strong className="text-slate-900">{filteredParts.length}</strong> {t("partsFound")}
            </span>
            {(selectedBrand || selectedCategory || search || selectedLocation) && (
              <button
                onClick={handleReset}
                className="text-xs text-blue-600 font-medium hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>

          <PartGrid parts={filteredParts} onResetFilters={handleReset} />
        </div>
      </div>
    </div>
  );
}
