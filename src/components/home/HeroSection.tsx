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
  Hash,
  Fingerprint,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRequestModal } from "../request/RequestModalContext";
import { useGarage } from "@/components/garage/GarageContext";

const VEHICLE_DATA: Record<string, Record<string, string[]>> = {
  Hyundai: {
    Sonata: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    Elantra: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    Tucson: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    "Santa Fe": ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    Palisade: ["2019", "2020", "2021", "2022", "2023", "2024"],
    Grandeur: ["2017", "2018", "2019", "2020", "2021", "2022"],
    Kona: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
  },
  Kia: {
    K5: ["2020", "2021", "2022", "2023", "2024"],
    Cerato: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Sportage: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    Sorento: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    Carnival: ["2021", "2022", "2023", "2024"],
    Seltos: ["2020", "2021", "2022", "2023", "2024"],
  },
  Genesis: {
    G70: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    G80: ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    G90: ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
    GV70: ["2021", "2022", "2023", "2024"],
    GV80: ["2020", "2021", "2022", "2023", "2024"],
  },
};

export default function HeroSection() {
  const t = useTranslations("hero");
  const tFinder = useTranslations("finder");
  const router = useRouter();
  const { openRequestModal } = useRequestModal();
  const { vehicle, setVehicle } = useGarage();

  // Active finder tab: "vehicle" | "oem" | "vin"
  const [activeTab, setActiveTab] = useState<"vehicle" | "oem" | "vin">("vehicle");

  // Vehicle form state
  const [make, setMake] = useState(vehicle?.make || "");
  const [model, setModel] = useState(vehicle?.model || "");
  const [year, setYear] = useState(vehicle?.year || "");

  // OEM & VIN search states
  const [oemQuery, setOemQuery] = useState("");
  const [vinQuery, setVinQuery] = useState("");

  const makes = Object.keys(VEHICLE_DATA);
  const models = make ? Object.keys(VEHICLE_DATA[make] || {}) : [];
  const years = make && model ? VEHICLE_DATA[make]?.[model] || [] : [];

  const handleVehicleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (make && model) {
      setVehicle({ make, model, year: year || undefined });
      router.push(`/catalog?brand=${encodeURIComponent(make)}&q=${encodeURIComponent(model)}`);
    } else {
      router.push("/catalog");
    }
  };

  const handleOemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (oemQuery.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(oemQuery.trim())}`);
    } else {
      router.push("/catalog");
    }
  };

  const handleVinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vinQuery.trim()) {
      openRequestModal({
        partName: "VIN Verification Request",
      });
    } else {
      openRequestModal();
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-[#F1F5F9]">
      {/* Soft background ambient blurs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-sky-100/40 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-200/80 shadow-sm text-blue-700 animate-in fade-in zoom-in duration-500">
            <span className="text-sm">🇰🇷</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {t("badge")}
            </span>
            <span className="text-sm">🇦🇿</span>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.08]">
              {t("titlePrefix")}{" "}
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                {t("titleHighlight")}
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          {/* Trodo-Style 3-in-1 Finder Box */}
          <div className="max-w-3xl mx-auto rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 p-4 sm:p-6 text-left space-y-4">
            {/* Finder Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80">
              <button
                onClick={() => setActiveTab("vehicle")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "vehicle"
                    ? "bg-white text-blue-600 shadow-sm border border-slate-200/80"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Car className="w-4 h-4" />
                <span>{tFinder("byVehicle")}</span>
              </button>

              <button
                onClick={() => setActiveTab("oem")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "oem"
                    ? "bg-white text-blue-600 shadow-sm border border-slate-200/80"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Hash className="w-4 h-4" />
                <span>{tFinder("byOem")}</span>
              </button>

              <button
                onClick={() => setActiveTab("vin")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "vin"
                    ? "bg-white text-blue-600 shadow-sm border border-slate-200/80"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Fingerprint className="w-4 h-4" />
                <span>{tFinder("byVin")}</span>
              </button>
            </div>

            {/* Tab 1: Vehicle Selector */}
            {activeTab === "vehicle" && (
              <form onSubmit={handleVehicleSubmit} className="space-y-3 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Make */}
                  <div className="relative">
                    <select
                      value={make}
                      onChange={(e) => {
                        setMake(e.target.value);
                        setModel("");
                        setYear("");
                      }}
                      className="w-full appearance-none bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 pr-8"
                    >
                      <option value="">{tFinder("make")}</option>
                      {makes.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Model */}
                  <div className="relative">
                    <select
                      value={model}
                      onChange={(e) => {
                        setModel(e.target.value);
                        setYear("");
                      }}
                      disabled={!make}
                      className="w-full appearance-none bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 pr-8 disabled:opacity-50"
                    >
                      <option value="">{tFinder("model")}</option>
                      {models.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Year */}
                  <div className="relative">
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      disabled={!model}
                      className="w-full appearance-none bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 pr-8 disabled:opacity-50"
                    >
                      <option value="">{tFinder("year")}</option>
                      {years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Auto-saves to My Garage for 100% fitment guarantee</span>
                  </div>
                  <Button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20"
                  >
                    <span>{tFinder("findParts")}</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
              </form>
            )}

            {/* Tab 2: OEM Part Number */}
            {activeTab === "oem" && (
              <form onSubmit={handleOemSubmit} className="space-y-3 animate-in fade-in duration-200">
                <div className="relative">
                  <Search className="w-5 h-5 text-blue-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={oemQuery}
                    onChange={(e) => setOemQuery(e.target.value)}
                    placeholder={tFinder("oemPlaceholder")}
                    className="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-slate-900 text-sm font-mono placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                  <span className="text-xs text-slate-500">
                    Direct Mobis catalog search (e.g. 58101-C1A00, 28113-D3000)
                  </span>
                  <Button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20"
                  >
                    <span>{t("searchBtn")}</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
              </form>
            )}

            {/* Tab 3: VIN Code Match */}
            {activeTab === "vin" && (
              <form onSubmit={handleVinSubmit} className="space-y-3 animate-in fade-in duration-200">
                <div className="relative">
                  <Fingerprint className="w-5 h-5 text-blue-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={vinQuery}
                    onChange={(e) => setVinQuery(e.target.value)}
                    maxLength={17}
                    placeholder={tFinder("vinPlaceholder")}
                    className="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-slate-900 text-sm font-mono uppercase placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                  <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    {tFinder("vinGuarantee")}
                  </span>
                  <Button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20"
                  >
                    <Sparkles className="w-4 h-4 mr-1.5" />
                    <span>Verify with VIN</span>
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* 4 Trust Stats Grid with Soft Pastel Backgrounds */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-left">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-blue-200 hover:shadow-md transition-all">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="font-bold text-sm text-slate-900">{t("stats.genuine")}</div>
              <div className="text-[11px] text-slate-500">{t("stats.genuineSub")}</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-blue-200 hover:shadow-md transition-all">
              <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-2">
                <Plane className="w-4 h-4" />
              </div>
              <div className="font-bold text-sm text-slate-900">{t("stats.delivery")}</div>
              <div className="text-[11px] text-slate-500">{t("stats.deliverySub")}</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-blue-200 hover:shadow-md transition-all">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                <Zap className="w-4 h-4" />
              </div>
              <div className="font-bold text-sm text-slate-900">{t("stats.partsCount")}</div>
              <div className="text-[11px] text-slate-500">{t("stats.partsSub")}</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-blue-200 hover:shadow-md transition-all">
              <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-2">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div className="font-bold text-sm text-slate-900">{t("stats.support")}</div>
              <div className="text-[11px] text-slate-500">{t("stats.supportSub")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

