"use client";

import { useTranslations } from "next-intl";
import { Plane, ShieldCheck, Clock, MapPin, Warehouse, ArrowRight } from "lucide-react";

export default function SupplyChainBanner() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="relative rounded-3xl glass-panel p-8 sm:p-12 border border-amber-500/30 overflow-hidden shadow-2xl">
          {/* Background Speed lines */}
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2">
                <Plane className="w-3.5 h-3.5" />
                Incheon (ICN) ✈ Baku (GYD)
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                South Korea to Azerbaijan Direct Express Air Corridor
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed">
                We bypass high local retail markups and dubious aftermarket copies by flying genuine factory Mobis parts directly out of our Seoul logistics warehouse.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="space-y-1">
                  <div className="text-2xl font-black text-amber-400">3 - 7 Days</div>
                  <div className="text-xs text-zinc-400">Air Express to Baku</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-black text-emerald-400">0% Risk</div>
                  <div className="text-xs text-zinc-400">Hologram Sealed OEM</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col gap-3">
              <div className="p-4 rounded-2xl bg-zinc-950/60 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                    🇰🇷
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Seoul / Incheon Warehouse</h4>
                    <p className="text-xs text-zinc-400">Mobis OEM factory procurement & inspection</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-400">Step 1</span>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-black flex items-center justify-center font-bold">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Weekly Direct Air Cargo</h4>
                    <p className="text-xs text-zinc-300">Customs clearance & fast international transit</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-400">Step 2</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/60 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                    🇦🇿
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Baku Distribution Center</h4>
                    <p className="text-xs text-zinc-400">Babek Avenue hub & nationwide courier dispatch</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400">Step 3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
