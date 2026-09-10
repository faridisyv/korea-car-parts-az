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
  Scale,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/components/layout/CurrencyToggle";
import { useRequestModal } from "@/components/request/RequestModalContext";
import { useCart } from "@/components/cart/CartContext";
import { type PartItem } from "@/components/catalog/PartCard";
import FitmentChecker from "@/components/catalog/FitmentChecker";

export default function PartDetailClient({ part }: { part: PartItem }) {
  const locale = useLocale();
  const t = useTranslations("partDetail");
  const { formatPrice } = useCurrency();
  const { openRequestModal } = useRequestModal();
  const { addItem } = useCart();
  const [copied, setCopied] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

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

  const handleAddToCart = () => {
    addItem(part, name);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const isBaku = part.location.toLowerCase().includes("baku");
  const waText = encodeURIComponent(
    `Hello! I want to order/inquire for OEM part ${part.partNumber} (${name}). Price: $${part.priceUSD}.`
  );
  const waLink = `https://wa.me/821048695673?text=${waText}`;

  return (
    <div className="container max-w-7xl mx-auto px-4 pt-32 pb-24 space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t("backToCatalog")}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Col: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-96 sm:h-[460px] w-full rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-md">
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
              <span className="px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md text-white font-black text-xs uppercase tracking-wider shadow-sm">
                {part.brand}
              </span>
              <span className="px-3 py-1 rounded-xl bg-blue-50/90 backdrop-blur-md border border-blue-200 text-blue-700 font-bold text-xs shadow-sm">
                {part.oemBrand}
              </span>
            </div>

            <div className="absolute top-4 right-4">
              {isBaku ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50/90 border border-emerald-200 text-emerald-700 text-xs font-bold backdrop-blur-md shadow-sm">
                  <Warehouse className="w-3.5 h-3.5 text-emerald-600" />
                  Baku Stock (24h)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50/90 border border-blue-200 text-blue-700 text-xs font-bold backdrop-blur-md shadow-sm">
                  <Plane className="w-3.5 h-3.5 text-blue-600" />
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
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden bg-white border transition-all ${
                    activeImage === img
                      ? "border-blue-600 ring-2 ring-blue-500/30 scale-105"
                      : "border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100"
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

          {/* Trodo Interactive Fitment Checker */}
          <div className="pt-2">
            <FitmentChecker
              compatibleModels={part.compatibleModels}
              partNumber={part.partNumber}
              partName={name}
              brand={part.brand}
            />
          </div>
        </div>

        {/* Right Col: Specifications & Order Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            {/* OEM Part Number Bar */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                {t("oemNumber")}:
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 border border-slate-200 text-xs font-mono text-slate-800 font-bold hover:text-blue-600 hover:border-blue-200 transition-colors"
              >
                <span>{part.partNumber}</span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {name}
            </h1>

            {/* Description */}
            {desc && (
              <p className="text-sm text-slate-600 leading-relaxed pt-1">
                {desc}
              </p>
            )}
          </div>

          {/* Pricing & Ordering Card */}
          <div className="rounded-3xl bg-white p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Wholesale Export Price:</span>
                <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {formatPrice(part.priceUSD)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-medium">Est. Delivery:</span>
                <span className="text-sm font-bold text-blue-600">
                  {part.deliveryDays}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
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
                  size="lg"
                  className="w-full text-xs font-bold uppercase tracking-wider py-4 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
                >
                  <Sparkles className="w-4 h-4 mr-1.5" />
                  {t("orderThisPart")}
                </Button>

                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-1.5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4 text-blue-600" />
                  <span>{addedToCart ? "✓ Added" : "Add to Cart"}</span>
                </button>
              </div>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-4 h-4" />
                {t("fastQuote")}
              </a>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="rounded-3xl bg-white p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-l-2 border-blue-600 pl-2">
              {t("specifications")}
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-slate-400" />
                  {t("condition")}
                </span>
                <span className="font-bold text-slate-800">{t("conditionValue")}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  {t("warranty")}
                </span>
                <span className="font-bold text-emerald-600">{t("warrantyValue")}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-slate-400" />
                  {t("origin")}
                </span>
                <span className="font-bold text-slate-800">{t("originValue")}</span>
              </div>

              {part.weightKg && (
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-slate-400" />
                    {t("weight")}
                  </span>
                  <span className="font-bold text-slate-800">{part.weightKg} kg</span>
                </div>
              )}
            </div>
          </div>

          {/* Vehicle Compatibility info */}
          <div className="rounded-3xl bg-white p-6 border border-slate-200/80 shadow-sm space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-l-2 border-blue-600 pl-2 flex items-center gap-2">
              <Car className="w-4 h-4 text-blue-600" />
              {t("compatibleCars")}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {part.compatibleModels}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

