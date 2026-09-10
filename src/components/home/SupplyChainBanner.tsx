"use client";

import { useTranslations } from "next-intl";
import { Plane, ShieldCheck, Clock, MapPin, Warehouse, ArrowRight } from "lucide-react";

export default function SupplyChainBanner() {
  return (
    <section className="py-16 relative overflow-hidden bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="relative rounded-3xl p-8 sm:p-12 border border-blue-200/80 bg-gradient-to-br from-blue-50/70 via-white to-sky-50/50 overflow-hidden shadow-lg shadow-blue-100/50">
          {/* Background subtle radial glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2">
                <Plane className="w-3.5 h-3.5" />
                Incheon (ICN) ✈ Baku (GYD) Express Corridor
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                Direct South Korea to Azerbaijan Air Bridge
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We bypass high local retail markups and dubious aftermarket copies by flying genuine factory Mobis parts directly out of our Seoul logistics warehouse.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200/80">
                <div className="space-y-1">
                  <div className="text-2xl font-black text-blue-600">3 - 7 Days</div>
                  <div className="text-xs text-slate-500 font-medium">Air Express to Baku</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-black text-emerald-600">0% Risk</div>
                  <div className="text-xs text-slate-500 font-medium">Hologram Sealed OEM</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col gap-3">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg border border-blue-100">
                    🇰🇷
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Seoul & Incheon Logistics Hub</h4>
                    <p className="text-xs text-slate-500">Mobis OEM factory procurement & inspection</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-100">Step 1</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-blue-300 shadow-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Weekly Direct Air Cargo Flight</h4>
                    <p className="text-xs text-slate-600">Customs clearance & fast international transit</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-600 text-white">Step 2</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg border border-emerald-100">
                    🇦🇿
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Baku Distribution Center</h4>
                    <p className="text-xs text-slate-500">Babek Avenue hub & nationwide courier dispatch</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100">Step 3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
