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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCurrency } from "../layout/CurrencyToggle";
import { useRequestModal } from "../request/RequestModalContext";

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

  return (
    <div className="group relative rounded-2xl glass-panel hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1">
      {/* Top Media / Visual Showcase */}
      <div className="relative h-48 w-full bg-zinc-950 overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

        {/* Brand Tag (Top Left) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-white font-extrabold text-[11px] uppercase tracking-wider">
            {part.brand}
          </span>
          {part.featured && (
            <span className="px-2 py-0.5 rounded-lg bg-amber-500 text-black font-black text-[10px] uppercase">
              Top Pick
            </span>
          )}
        </div>

        {/* Stock / Location Status Tag (Top Right) */}
        <div className="absolute top-3 right-3">
          {isBaku ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold backdrop-blur-md">
              <Warehouse className="w-3 h-3" />
              Baku (24h)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-500/20 border border-sky-500/40 text-sky-300 text-[10px] font-bold backdrop-blur-md">
              <Plane className="w-3 h-3" />
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
            <span className="text-[11px] font-mono text-zinc-400">
              OEM:
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-amber-400 font-bold hover:border-amber-500/40 transition-colors"
              title="Click to copy OEM number"
            >
              <span>{part.partNumber}</span>
              {copied ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3 text-zinc-400" />
              )}
            </button>
          </div>

          {/* Part Name */}
          <Link
            href={`/catalog/${part.id}`}
            className="block font-bold text-base text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug"
          >
            {name}
          </Link>

          {/* Compatible Models snippet */}
          <div className="flex items-start gap-1.5 text-xs text-zinc-400 pt-1">
            <Car className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
            <p className="line-clamp-1 text-[11px] text-zinc-400">
              {part.compatibleModels}
            </p>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-white/10 space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-zinc-400 block">Export Price:</span>
              <span className="text-2xl font-black text-white tracking-tight">
                {formatPrice(part.priceUSD)}
              </span>
            </div>
            <span className="text-[10px] text-amber-400/90 font-medium px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
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
              variant="gold"
              size="sm"
              className="w-full text-xs font-bold"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              {t("requestQuote")}
            </Button>
            <Link href={`/catalog/${part.id}`} className="w-full">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs hover:border-amber-500/50"
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
