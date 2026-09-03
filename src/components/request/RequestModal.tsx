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
      {/* Semi-transparent Dark Backdrop with deep blur */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={closeRequestModal}
      />

      {/* Glassmorphic Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl glass-modal overflow-hidden z-10 animate-in zoom-in-95 fade-in duration-200 border border-amber-500/30 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
      >
        {/* Top Header Glow Stripe */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />

        {/* Modal Header */}
        <div className="px-6 pt-5 pb-4 border-b border-white/10 flex items-start justify-between gap-4 bg-zinc-950/40">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                <PlaneTakeoff className="w-3 h-3" />
                Korea Direct Export
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/10 text-[10px] font-mono">
                Mobis OEM
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {t("title")}
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-lg">
              {t("subtitle")}
            </p>
          </div>

          <button
            onClick={closeRequestModal}
            className="p-2 rounded-xl text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto max-h-[calc(92vh-140px)]">
          <RequestForm prefill={prefill} onSuccess={() => {}} />
        </div>

        {/* Modal Footer Trust Bar */}
        <div className="px-6 py-3 bg-zinc-950/80 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
          <div className="flex items-center gap-1.5 text-amber-400/90 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Genuine Parts Guarantee</span>
          </div>
          <span className="text-zinc-500">Seoul • Incheon • Baku</span>
        </div>
      </div>
    </div>
  );
}
