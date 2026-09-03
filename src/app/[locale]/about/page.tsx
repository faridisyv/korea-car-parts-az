"use client";

import { useTranslations } from "next-intl";
import {
  ShieldCheck,
  Plane,
  Building2,
  CheckCircle2,
  Users,
  Award,
  Truck,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="container max-w-7xl mx-auto px-4 pt-32 pb-24 space-y-16">
      {/* Header Banner */}
      <div className="rounded-3xl glass-panel p-8 sm:p-14 border border-white/10 relative overflow-hidden text-center max-w-4xl mx-auto">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            Direct Korean Supplier
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t("title")}
          </h1>
          <p className="text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Story & Mission Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {t("storyHeading")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Direct Supply From Seoul & Incheon To Baku
            </h2>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {t("story1")}
          </p>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {t("story2")}
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl font-black text-amber-400">100%</div>
              <div className="text-xs text-zinc-400">Mobis OEM Guarantee</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl font-black text-sky-400">3 - 7d</div>
              <div className="text-xs text-zinc-400">Express Air Delivery</div>
            </div>
          </div>
        </div>

        {/* Feature Cards Stack */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              {t("feature1Title")}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {t("feature1Desc")}
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold mb-2">
              <Plane className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              {t("feature2Title")}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {t("feature2Desc")}
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold mb-2">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              {t("feature3Title")}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {t("feature3Desc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
