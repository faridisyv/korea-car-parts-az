"use client";

import { useTranslations } from "next-intl";
import {
  FileSearch,
  Cpu,
  PackageCheck,
  PlaneTakeoff,
  Sparkles,
} from "lucide-react";

export default function ProcessSection() {
  const t = useTranslations("process");

  const steps = [
    {
      num: "01",
      icon: FileSearch,
      title: t("step1.title"),
      desc: t("step1.desc"),
      color: "border-amber-500/40 text-amber-400 bg-amber-500/10",
    },
    {
      num: "02",
      icon: Cpu,
      title: t("step2.title"),
      desc: t("step2.desc"),
      color: "border-sky-500/40 text-sky-400 bg-sky-500/10",
    },
    {
      num: "03",
      icon: PackageCheck,
      title: t("step3.title"),
      desc: t("step3.desc"),
      color: "border-purple-500/40 text-purple-400 bg-purple-500/10",
    },
    {
      num: "04",
      icon: PlaneTakeoff,
      title: t("step4.title"),
      desc: t("step4.desc"),
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
    },
  ];

  return (
    <section className="py-20 relative bg-zinc-950/40 border-y border-white/5">
      <div className="container max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Seamless Fulfillment
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t("title")}
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative rounded-3xl glass-panel p-6 border border-white/10 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${step.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-zinc-600">
                    {step.num}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-zinc-600 font-bold text-sm">
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
