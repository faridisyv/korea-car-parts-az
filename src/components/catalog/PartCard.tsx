"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import {
  ShieldCheck,
  Plane,
  Warehouse,
  ArrowRight,
  Sparkles,
  Copy,
  Check,
  Car,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrency } from "../layout/CurrencyToggle";
import { useRequestModal } from "../request/RequestModalContext";
import { useGarage } from "../garage/GarageContext";

export interface PartItem {
  id: string;
  partNumber: string;
  brand: string;
  category: string;
  priceUSD: number;
  priceAZN?: number | null;
  inStock: boolean;
  stockCount: number;
  location: string;
  deliveryDays: string;
  images: string; // JSON string
  compatibleModels: string;
  oemBrand: string;
  translations: string; // JSON string
  featured?: boolean;
  weightKg?: number | null;
}

export default function PartCard({ part }: { part: PartItem }) {
  const locale = useLocale();
  const t = useTranslations("catalog");
  const { formatPrice } = useCurrency();
  const { openRequestModal } = useRequestModal();
  const { vehicle } = useGarage();
  const [copied, setCopied] = useState(false);

  // Parse JSON translations safely
  let name = part.partNumber;
  let desc = "";
  try {
    const trans = JSON.parse(part.translations);
    const loc = trans[locale] || trans["en"] || trans["az"];
    if (loc) {
      name = loc.name || part.partNumber;
      desc = loc.desc || "";
    }
  } catch (e) {
    name = part.partNumber;
  }

  // Parse images
  let imageUrl =
    "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=800&auto=format&fit=crop&q=80";
  try {
    const imgArr = JSON.parse(part.images);
    if (Array.isArray(imgArr) && imgArr.length > 0) {
      imageUrl = imgArr[0];
    }
  } catch (e) {
    // fallback
  }

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(part.partNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isBaku = part.location.toLowerCase().includes("baku");

  // Trodo Fitment Match: compare with user's garage vehicle
  const isVehicleMatched =
    vehicle?.model &&
    (part.compatibleModels.toLowerCase().includes(vehicle.model.toLowerCase()) ||
      part.compatibleModels.toLowerCase().includes(vehicle.make.toLowerCase()));

  return (
    <div className="group relative rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1">
      {/* Top Media / Visual Showcase */}
      <div className="relative h-48 w-full bg-slate-50 overflow-hidden border-b border-slate-100">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Brand Tag (Top Left) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md border border-slate-200 text-slate-800 font-extrabold text-[11px] uppercase tracking-wider shadow-sm">
            {part.brand}
          </span>
          {part.featured && (
            <span className="px-2 py-0.5 rounded-lg bg-blue-600 text-white font-black text-[10px] uppercase shadow-sm">
              Top Pick
            </span>
          )}
        </div>

        {/* Stock / Location Status Tag (Top Right) */}
        <div className="absolute top-3 right-3">
          {isBaku ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50/90 border border-emerald-200 text-emerald-700 text-[10px] font-bold backdrop-blur-md shadow-sm">
              <Warehouse className="w-3 h-3 text-emerald-600" />
              Baku (24h)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50/90 border border-blue-200 text-blue-700 text-[10px] font-bold backdrop-blur-md shadow-sm">
              <Plane className="w-3 h-3 text-blue-600" />
              Seoul (4-7d)
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* OEM Part Number with Copy Action */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-mono text-slate-400">
              OEM Code:
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-50 border border-slate-200 text-[11px] font-mono text-slate-700 font-bold hover:text-blue-600 hover:border-blue-200 transition-colors"
              title="Click to copy OEM number"
            >
              <span>{part.partNumber}</span>
              {copied ? (
                <Check className="w-3 h-3 text-emerald-600" />
              ) : (
                <Copy className="w-3 h-3 text-slate-400" />
              )}
            </button>
          </div>

          {/* Part Name */}
          <Link
            href={`/catalog/${part.id}`}
            className="block font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug"
          >
            {name}
          </Link>

          {/* Trodo Fitment Badge (if vehicle selected) */}
          {isVehicleMatched ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>✓ Guaranteed fit: {vehicle?.model}</span>
            </div>
          ) : (
            <div className="flex items-start gap-1.5 text-xs text-slate-500 pt-0.5">
              <Car className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <p className="line-clamp-1 text-[11px] text-slate-500">
                {part.compatibleModels}
              </p>
            </div>
          )}
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Wholesale Export:</span>
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                {formatPrice(part.priceUSD)}
              </span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
              {part.oemBrand}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() =>
                openRequestModal({
                  partNumber: part.partNumber,
                  partName: name,
                  carModel: part.brand,
                })
              }
              variant="default"
              size="sm"
              className="w-full text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              {t("requestQuote")}
            </Button>
            <Link href={`/catalog/${part.id}`} className="w-full">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs hover:border-blue-300 hover:text-blue-600"
              >
                <span>{t("viewDetails")}</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

