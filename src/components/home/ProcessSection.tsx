"use client";

import {
  FileSearch,
  Cpu,
  PackageCheck,
  PlaneTakeoff,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function ProcessSection() {
  const t = useTranslations("process");

  const steps = [
    {
      num: "01",
      icon: FileSearch,
      title: t("step1.title"),
      desc: t("step1.desc"),
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      border: "border-blue-200",
    },
    {
      num: "02",
      icon: Cpu,
      title: t("step2.title"),
      desc: t("step2.desc"),
      iconBg: "bg-sky-50",
      iconColor: "text-sky-600",
      border: "border-sky-200",
    },
    {
      num: "03",
      icon: PackageCheck,
      title: t("step3.title"),
      desc: t("step3.desc"),
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      border: "border-purple-200",
    },
    {
      num: "04",
      icon: PlaneTakeoff,
      title: t("step4.title"),
      desc: t("step4.desc"),
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      border: "border-emerald-200",
    },
  ];

  return (
    <section className="py-20 relative bg-slate-50 border-y border-slate-100">
      <div className="container max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Seamless Fulfillment
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className={`relative rounded-3xl bg-white border ${step.border} p-6 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${step.iconBg} ${step.iconColor}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-200">
                    {step.num}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-800 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-300 font-bold text-sm">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
