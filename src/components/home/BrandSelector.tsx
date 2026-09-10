"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export default function BrandSelector() {
  const t = useTranslations("brands");

  const brands = [
    {
      name: "Hyundai",
      badge: "Hyundai Mobis OEM",
      models: "Sonata • Elantra • Tucson • Santa Fe • Palisade • Grandeur",
      bg: "bg-gradient-to-br from-blue-50 to-sky-50",
      border: "border-blue-200 hover:border-blue-400",
      accent: "text-blue-600",
      dot: "bg-blue-500",
      tag: "Top Sourced",
      tagBg: "bg-blue-100 text-blue-700",
    },
    {
      name: "Kia",
      badge: "Kia Genuine Parts",
      models: "K5 • Sportage • Sorento • Carnival • Stinger • Cerato • Seltos",
      bg: "bg-gradient-to-br from-red-50 to-rose-50",
      border: "border-red-200 hover:border-red-400",
      accent: "text-red-600",
      dot: "bg-red-500",
      tag: "Factory Direct",
      tagBg: "bg-red-100 text-red-700",
    },
    {
      name: "Genesis",
      badge: "Genesis Luxury Parts",
      models: "G70 • G80 • G90 • GV70 • GV80 Luxury & Sport Editions",
      bg: "bg-gradient-to-br from-amber-50 to-yellow-50",
      border: "border-amber-200 hover:border-amber-400",
      accent: "text-amber-700",
      dot: "bg-amber-500",
      tag: "Premium Line",
      tagBg: "bg-amber-100 text-amber-700",
    },
  ];

  return (
    <section className="py-16 relative bg-white border-t border-slate-100">
      <div className="container max-w-7xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Direct Factory Channels
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {brands.map((b) => (
            <Link
              key={b.name}
              href={`/catalog?brand=${b.name}`}
              className={`group relative rounded-3xl p-8 border ${b.bg} ${b.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between overflow-hidden`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${b.tagBg}`}>
                    {b.tag}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:border-blue-200 group-hover:translate-x-1 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <h3 className={`text-3xl font-black text-slate-800 group-hover:${b.accent} transition-colors`}>
                    {b.name}
                  </h3>
                  <p className={`text-xs font-bold ${b.accent}`}>
                    {b.badge}
                  </p>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-200">
                  {b.models}
                </p>
              </div>

              <div className="pt-6 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-slate-700 transition-colors">
                <span>Browse {b.name} Catalog</span>
                <span className={b.accent}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
