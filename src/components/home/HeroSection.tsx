"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import {
  Sparkles,
  Search,
  ShieldCheck,
  Plane,
  Car,
  CheckCircle,
  ArrowRight,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRequestModal } from "../request/RequestModalContext";

export default function HeroSection() {
  const t = useTranslations("hero");
  const router = useRouter();
  const { openRequestModal } = useRequestModal();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/catalog");
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Dynamic Background Glow & High Performance Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Speed grid texture background */}
      <div className="absolute inset-0 bg-[radial-gradient(#242b3a_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge: Korea -> Azerbaijan Exporter */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)] animate-in fade-in zoom-in duration-500">
            <span className="text-sm">🇰🇷</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              {t("badge")}
            </span>
            <span className="text-sm">🇦🇿</span>
          </div>

          {/* Main Title with Automotive Gradient */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
              {t("titlePrefix")}{" "}
              <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent underline decoration-amber-500/30 decoration-wavy decoration-2">
                {t("titleHighlight")}
              </span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          {/* Quick Search / VIN Lookup Bar */}
          <form
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto relative flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl glass-panel-glow bg-zinc-950/80 border-amber-500/40 shadow-2xl"
          >
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full pl-12 pr-4 py-3.5 bg-transparent text-white text-sm placeholder:text-zinc-500 focus:outline-none"
              />
            </div>
            <Button
              type="submit"
              variant="gold"
              className="w-full sm:w-auto px-7 py-3.5 text-sm font-black whitespace-nowrap shadow-lg"
            >
              <span>{t("searchBtn")}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </form>

          {/* Direct CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              onClick={() => openRequestModal()}
              variant="gold"
              size="lg"
              className="shadow-[0_0_30px_rgba(245,158,11,0.25)] text-sm uppercase tracking-wide"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {t("requestCta")}
            </Button>
            <Button
              onClick={() => router.push("/catalog")}
              variant="outline"
              size="lg"
              className="text-sm font-bold border-white/20 hover:border-amber-500/60 uppercase tracking-wide"
            >
              <Car className="w-4 h-4 mr-2 text-amber-400" />
              {t("browseCatalog")}
            </Button>
          </div>

          {/* 4 Trust Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 text-left">
            <div className="p-4 rounded-2xl glass-panel border-white/10 hover:border-amber-500/30 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="font-black text-sm text-white">{t("stats.genuine")}</div>
              <div className="text-[11px] text-zinc-400">{t("stats.genuineSub")}</div>
            </div>

            <div className="p-4 rounded-2xl glass-panel border-white/10 hover:border-amber-500/30 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-2">
                <Plane className="w-5 h-5" />
              </div>
              <div className="font-black text-sm text-white">{t("stats.delivery")}</div>
              <div className="text-[11px] text-zinc-400">{t("stats.deliverySub")}</div>
            </div>

            <div className="p-4 rounded-2xl glass-panel border-white/10 hover:border-amber-500/30 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2">
                <Zap className="w-5 h-5" />
              </div>
              <div className="font-black text-sm text-white">{t("stats.partsCount")}</div>
              <div className="text-[11px] text-zinc-400">{t("stats.partsSub")}</div>
            </div>

            <div className="p-4 rounded-2xl glass-panel border-white/10 hover:border-amber-500/30 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="font-black text-sm text-white">{t("stats.support")}</div>
              <div className="text-[11px] text-zinc-400">{t("stats.supportSub")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
