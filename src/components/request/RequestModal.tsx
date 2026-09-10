"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { X, ShieldCheck, Sparkles, PlaneTakeoff } from "lucide-react";
import { useRequestModal } from "./RequestModalContext";
import RequestForm from "./RequestForm";

export default function RequestModal() {
  const t = useTranslations("requestModal");
  const { isOpen, prefill, closeRequestModal } = useRequestModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeRequestModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeRequestModal]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Semi-transparent Backdrop with subtle blur */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={closeRequestModal}
      />

      {/* Clean Soft Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl bg-white overflow-hidden z-10 animate-in zoom-in-95 fade-in duration-200 border border-slate-200 shadow-2xl"
      >
        {/* Top Header Soft Stripe */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600" />

        {/* Modal Header */}
        <div className="px-6 pt-5 pb-4 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                <PlaneTakeoff className="w-3 h-3" />
                Korea Direct Export
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-mono">
                Mobis OEM
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
              {t("title")}
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed max-w-lg">
              {t("subtitle")}
            </p>
          </div>

          <button
            onClick={closeRequestModal}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto max-h-[calc(92vh-140px)] bg-white">
          <RequestForm prefill={prefill} onSuccess={() => {}} />
        </div>

        {/* Modal Footer Trust Bar */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 text-blue-600 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Genuine Parts Guarantee</span>
          </div>
          <span className="text-slate-400">Seoul • Incheon • Baku</span>
        </div>
      </div>
    </div>
  );
}
