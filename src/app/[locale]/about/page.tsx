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
      <div className="rounded-3xl bg-white p-8 sm:p-14 border border-slate-200/80 shadow-sm relative overflow-hidden text-center max-w-4xl mx-auto bg-gradient-to-br from-blue-50/60 via-white to-slate-50">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-100/40 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            Direct Korean Supplier
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Story & Mission Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              {t("storyHeading")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Direct Supply From Seoul & Incheon To Baku
            </h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t("story1")}
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t("story2")}
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-2xl font-black text-blue-600">100%</div>
              <div className="text-xs text-slate-500 font-medium">Mobis OEM Guarantee</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-2xl font-black text-emerald-600">3 - 7d</div>
              <div className="text-xs text-slate-500 font-medium">Express Air Delivery</div>
            </div>
          </div>
        </div>

        {/* Feature Cards Stack */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {t("feature1Title")}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t("feature1Desc")}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold mb-2">
              <Plane className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {t("feature2Title")}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t("feature2Desc")}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-2">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {t("feature3Title")}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t("feature3Desc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
