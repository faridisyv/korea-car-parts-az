"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  Disc,
  Filter,
  Flame,
  Activity,
  Droplets,
  Zap,
  Cog,
  Car,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export default function CategoryExplorer() {
  const tCat = useTranslations("categories");

  const categories = [
    {
      id: "brakes",
      titleKey: "brakes",
      icon: Disc,
      iconColor: "text-rose-600 bg-rose-50 border-rose-100",
      accentHover: "group-hover:border-rose-300",
      items: ["Brake Pads", "Brake Discs", "Calipers", "ABS Sensors"],
    },
    {
      id: "filters",
      titleKey: "filters",
      icon: Filter,
      iconColor: "text-amber-600 bg-amber-50 border-amber-100",
      accentHover: "group-hover:border-amber-300",
      items: ["Oil Filters", "Air Filters", "Cabin / AC", "Fuel Filters"],
    },
    {
      id: "engine",
      titleKey: "engine",
      icon: Flame,
      iconColor: "text-orange-600 bg-orange-50 border-orange-100",
      accentHover: "group-hover:border-orange-300",
      items: ["Spark Plugs", "Timing Belts", "Gaskets", "Engine Mounts"],
    },
    {
      id: "suspension",
      titleKey: "suspension",
      icon: Activity,
      iconColor: "text-blue-600 bg-blue-50 border-blue-100",
      accentHover: "group-hover:border-blue-300",
      items: ["Control Arms", "Shock Absorbers", "Tie Rods", "Stabilizer Links"],
    },
    {
      id: "electrical",
      titleKey: "electrical",
      icon: Zap,
      iconColor: "text-violet-600 bg-violet-50 border-violet-100",
      accentHover: "group-hover:border-violet-300",
      items: ["Headlights", "Ignition Coils", "Alternators", "Oxygen Sensors"],
    },
    {
      id: "transmission",
      titleKey: "transmission",
      icon: Cog,
      iconColor: "text-teal-600 bg-teal-50 border-teal-100",
      accentHover: "group-hover:border-teal-300",
      items: ["Clutch Kits", "CV Axles", "Flywheels", "Transmission Mounts"],
    },
    {
      id: "body",
      titleKey: "body",
      icon: Car,
      iconColor: "text-indigo-600 bg-indigo-50 border-indigo-100",
      accentHover: "group-hover:border-indigo-300",
      items: ["Bumpers", "Mirrors", "Radiator Grilles", "Fenders"],
    },
    {
      id: "oils",
      titleKey: "filters", // fallback or maintenance
      overrideTitle: "Oils & Maintenance Fluids",
      icon: Droplets,
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
      accentHover: "group-hover:border-emerald-300",
      items: ["Mobis Engine Oil", "ATF Fluid", "Coolant", "DOT4 Brake Fluid"],
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-slate-200/70 relative">
      <div className="container max-w-7xl mx-auto px-4 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              Trodo-Style Category Catalog
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {tCat("title")}
            </h2>
            <p className="text-sm text-slate-500 max-w-xl">
              {tCat("subtitle")}
            </p>
          </div>

          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider"
          >
            <span>View All Parts (50,000+)</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const title = cat.overrideTitle || tCat(cat.titleKey as any);
            return (
              <Link
                key={cat.id}
                href={`/catalog?category=${cat.id}`}
                className={`group rounded-2xl p-5 bg-[#F8FAFC] hover:bg-white border border-slate-200/80 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1 ${cat.accentHover}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center border ${cat.iconColor} transition-transform group-hover:scale-105`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {title}
                    </h3>
                  </div>

                  {/* Subcategories tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cat.items.map((sub, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200/70 text-slate-600 group-hover:border-slate-300"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                  <span>Browse Category</span>
                  <span>→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
