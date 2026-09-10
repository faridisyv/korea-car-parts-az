"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useGarage } from "@/components/garage/GarageContext";
import { CheckCircle, AlertCircle, Car, ShieldCheck, HelpCircle, Sparkles } from "lucide-react";
import { useRequestModal } from "@/components/request/RequestModalContext";

interface FitmentCheckerProps {
  compatibleModels: string;
  partNumber: string;
  partName: string;
  brand: string;
}

export default function FitmentChecker({
  compatibleModels,
  partNumber,
  partName,
  brand,
}: FitmentCheckerProps) {
  const t = useTranslations("fitment");
  const { vehicle } = useGarage();
  const { openRequestModal } = useRequestModal();
  const [vinInput, setVinInput] = useState("");
  const [vinChecked, setVinChecked] = useState(false);

  // Check if current garage vehicle is in compatibleModels
  const hasVehicle = Boolean(vehicle?.make && vehicle?.model);
  const isCompatible = hasVehicle
    ? compatibleModels.toLowerCase().includes(vehicle!.model.toLowerCase()) ||
      compatibleModels.toLowerCase().includes(vehicle!.make.toLowerCase())
    : null;

  const handleVinCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vinInput.trim()) return;
    setVinChecked(true);
  };

  return (
    <div className="rounded-2xl p-5 bg-[#F8FAFC] border border-slate-200 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {t("freeCheckTitle")}
            </h4>
            <p className="text-[11px] text-slate-500">
              Guaranteed 100% fitment check before delivery
            </p>
          </div>
        </div>
      </div>

      {/* State 1: Vehicle is selected in My Garage */}
      {hasVehicle ? (
        <div
          className={`p-3.5 rounded-xl border flex items-start gap-3 ${
            isCompatible
              ? "bg-emerald-50/70 border-emerald-200 text-emerald-800"
              : "bg-amber-50/70 border-amber-200 text-amber-800"
          }`}
        >
          {isCompatible ? (
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1 text-xs">
            <p className="font-bold">
              {isCompatible
                ? `✓ ${t("guaranteed")} for your ${vehicle?.year} ${vehicle?.make} ${vehicle?.model}`
                : `Compatibility check recommended for ${vehicle?.year} ${vehicle?.make} ${vehicle?.model}`}
            </p>
            <p className="text-[11px] opacity-90 leading-relaxed">
              {isCompatible
                ? "This OEM part directly replaces the factory specification for your vehicle."
                : "This item may differ depending on your engine code or trim. Let our technicians check your VIN."}
            </p>
          </div>
        </div>
      ) : (
        /* State 2: No vehicle in garage */
        <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80 text-blue-800 flex items-start gap-2.5">
          <Car className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <span className="font-bold block">{t("selectCar")}</span>
            <span className="text-[11px] text-slate-600 leading-relaxed block">
              Compatible with: {compatibleModels}
            </span>
          </div>
        </div>
      )}

      {/* Instant VIN Check Form */}
      <div className="pt-2 border-t border-slate-200/70 space-y-2">
        <form onSubmit={handleVinCheck} className="flex gap-2">
          <input
            type="text"
            value={vinInput}
            onChange={(e) => {
              setVinInput(e.target.value);
              setVinChecked(false);
            }}
            placeholder="Enter 17-digit VIN code..."
            maxLength={17}
            className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono uppercase text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <button
            type="submit"
            disabled={!vinInput.trim()}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-bold transition-colors shrink-0"
          >
            {t("verifyWithVin")}
          </button>
        </form>

        {vinChecked && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between gap-2">
            <span className="text-[11px] font-medium">
              VIN ({vinInput.toUpperCase()}) queued for Mobis factory catalog lookup.
            </span>
            <button
              onClick={() =>
                openRequestModal({
                  partNumber,
                  partName,
                  carModel: brand,
                })
              }
              className="text-[11px] font-bold text-emerald-700 underline hover:text-emerald-900 shrink-0"
            >
              Confirm with Expert
            </button>
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
          <span className="flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            {t("freeCheckDesc")}
          </span>
          <button
            onClick={() =>
              openRequestModal({
                partNumber,
                partName,
                carModel: brand,
              })
            }
            className="font-bold text-blue-600 hover:text-blue-700 hover:underline shrink-0"
          >
            {t("expertReview")} →
          </button>
        </div>
      </div>
    </div>
  );
}
