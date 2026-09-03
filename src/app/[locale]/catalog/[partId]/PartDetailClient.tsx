"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import {
  ShieldCheck,
  Plane,
  Warehouse,
  ArrowLeft,
  Sparkles,
  Copy,
  Check,
  Car,
  MessageCircle,
  Truck,
  FileCheck,
  Layers,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/components/layout/CurrencyToggle";
import { useRequestModal } from "@/components/request/RequestModalContext";
import { type PartItem } from "@/components/catalog/PartCard";

export default function PartDetailClient({ part }: { part: PartItem }) {
  const locale = useLocale();
  const t = useTranslations("partDetail");
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
  let images: string[] = [];
  try {
    const imgArr = JSON.parse(part.images);
    if (Array.isArray(imgArr) && imgArr.length > 0) {
      images = imgArr;
    }
  } catch (e) {}

  if (images.length === 0) {
    images = [
      "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=800&auto=format&fit=crop&q=80",
    ];
  }

  const [activeImage, setActiveImage] = useState(images[0]);

  const handleCopy = () => {
    navigator.clipboard.writeText(part.partNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isBaku = part.location.toLowerCase().includes("baku");
  const waText = encodeURIComponent(
    `Hello! I want to order/inquire for OEM part ${part.partNumber} (${name}). Price: $${part.priceUSD}.`
  );
  const waLink = `https://wa.me/994507779988?text=${waText}`;

  return (
    <div className="container max-w-7xl mx-auto px-4 pt-32 pb-24 space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-amber-400 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t("backToCatalog")}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Col: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-96 sm:h-[460px] w-full rounded-3xl overflow-hidden glass-panel border border-white/15 bg-zinc-950 shadow-2xl">
            <Image
              src={activeImage}
              alt={name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain p-6 hover:scale-105 transition-transform duration-300"
            />
            {/* Top badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-white font-black text-xs uppercase tracking-wider">
                {part.brand}
              </span>
              <span className="px-3 py-1 rounded-xl bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-amber-300 font-bold text-xs">
                {part.oemBrand}
              </span>
            </div>

            <div className="absolute top-4 right-4">
              {isBaku ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold backdrop-blur-md">
                  <Warehouse className="w-3.5 h-3.5" />
                  Baku Stock (24h)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-300 text-xs font-bold backdrop-blur-md">
                  <Plane className="w-3.5 h-3.5" />
                  Seoul Direct (4-7d)
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails if multiple */}
          {images.length > 1 && (
            <div className="flex items-center gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden glass-panel border transition-all ${
                    activeImage === img
                      ? "border-amber-500 ring-2 ring-amber-500/40 scale-105"
                      : "border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt="thumbnail"
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Col: Specifications & Order Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            {/* OEM Part Number Bar */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">
                {t("oemNumber")}:
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-amber-400 font-bold hover:border-amber-500/40 transition-colors"
              >
                <span>{part.partNumber}</span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                )}
              </button>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {name}
            </h1>

            {/* Description */}
            {desc && (
              <p className="text-sm text-zinc-300 leading-relaxed pt-1">
                {desc}
              </p>
            )}
          </div>

          {/* Pricing Box */}
          <div className="rounded-2xl glass-panel p-6 border border-amber-500/30 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-zinc-400 block">Wholesale Export Price:</span>
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {formatPrice(part.priceUSD)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-zinc-400 block">Est. Delivery:</span>
                <span className="text-sm font-bold text-amber-400">
                  {part.deliveryDays}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <Button
                onClick={() =>
                  openRequestModal({
                    partNumber: part.partNumber,
                    partName: name,
                    carModel: part.brand,
                  })
                }
                variant="gold"
                size="lg"
                className="w-full text-sm font-black uppercase tracking-wider py-4 shadow-xl shadow-amber-500/20"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {t("orderThisPart")}
              </Button>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-4 h-4" />
                {t("fastQuote")}
              </a>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="rounded-2xl glass-panel p-6 border border-white/10 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-white border-l-2 border-amber-500 pl-2">
              {t("specifications")}
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-zinc-500" />
                  {t("condition")}
                </span>
                <span className="font-bold text-white">{t("conditionValue")}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
                  {t("warranty")}
                </span>
                <span className="font-bold text-emerald-400">{t("warrantyValue")}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-zinc-500" />
                  {t("origin")}
                </span>
                <span className="font-bold text-white">{t("originValue")}</span>
              </div>

              {part.weightKg && (
                <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-zinc-500" />
                    {t("weight")}
                  </span>
                  <span className="font-bold text-white">{part.weightKg} kg</span>
                </div>
              )}
            </div>
          </div>

          {/* Vehicle Compatibility */}
          <div className="rounded-2xl glass-panel p-6 border border-white/10 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-white border-l-2 border-amber-500 pl-2 flex items-center gap-2">
              <Car className="w-4 h-4 text-amber-400" />
              {t("compatibleCars")}
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {part.compatibleModels}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
