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
      color: "from-blue-600/20 to-sky-500/10",
      borderColor: "hover:border-sky-500/50",
      accentColor: "text-sky-400",
      tag: "Top Sourced",
    },
    {
      name: "Kia",
      badge: "Kia Genuine Parts",
      models: "K5 • Sportage • Sorento • Carnival • Stinger • Cerato • Seltos",
      color: "from-red-600/20 to-amber-500/10",
      borderColor: "hover:border-red-500/50",
      accentColor: "text-red-400",
      tag: "Factory Direct",
    },
    {
      name: "Genesis",
      badge: "Genesis Luxury Parts",
      models: "G70 • G80 • G90 • GV70 • GV80 Luxury & Sport Editions",
      color: "from-amber-600/20 to-yellow-500/10",
      borderColor: "hover:border-amber-500/50",
      accentColor: "text-amber-400",
      tag: "Premium Line",
    },
  ];

  return (
    <section className="py-16 relative">
      <div className="container max-w-7xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Direct Factory Channels
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t("title")}
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {brands.map((b) => (
            <Link
              key={b.name}
              href={`/catalog?brand=${b.name}`}
              className={`group relative rounded-3xl p-8 glass-panel border border-white/10 ${b.borderColor} transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between overflow-hidden`}
            >
              {/* Background Ambient Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${b.color} opacity-40 group-hover:opacity-80 transition-opacity`}
              />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-zinc-200">
                    {b.tag}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <h3 className="text-3xl font-black text-white group-hover:text-amber-400 transition-colors">
                    {b.name}
                  </h3>
                  <p className={`text-xs font-bold ${b.accentColor}`}>
                    {b.badge}
                  </p>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed pt-2 border-t border-white/10">
                  {b.models}
                </p>
              </div>

              <div className="relative z-10 pt-6 flex items-center justify-between text-xs font-bold text-zinc-400 group-hover:text-white transition-colors">
                <span>Browse {b.name} Catalog</span>
                <span className="text-amber-400">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
