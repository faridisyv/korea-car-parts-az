"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  ShieldCheck,
  Plane,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { useRequestModal } from "../request/RequestModalContext";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact");
  const { openRequestModal } = useRequestModal();

  return (
    <footer className="relative bg-[#06070a] border-t border-white/10 pt-16 pb-12 overflow-hidden text-zinc-400">
      {/* Decorative gradient blur background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-500/5 blur-[100px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 space-y-12">
        {/* Top Banner: Quick Part Sourcing Callout */}
        <div className="rounded-3xl glass-panel p-8 relative overflow-hidden border border-amber-500/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Korea Direct Sourcing
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Need a rare Hyundai or Kia part?
            </h3>
            <p className="text-sm text-zinc-300 max-w-xl">
              Send us your 17-digit VIN code. Our Seoul procurement team will source factory-fresh Mobis parts directly from South Korea.
            </p>
          </div>
          <button
            onClick={() => openRequestModal()}
            className="shrink-0 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-extrabold text-sm tracking-wide uppercase hover:brightness-110 shadow-xl shadow-amber-500/20 transition-all hover:scale-105"
          >
            {tNav("requestPart")}
          </button>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-black font-black text-lg">
                K
              </div>
              <span className="font-black text-xl tracking-tight text-white">
                KOREA<span className="text-amber-400">PARTS</span>.AZ
              </span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400">
              {t("description")}
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Genuine Mobis & Kia OEM</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white border-l-2 border-amber-500 pl-2">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  {tNav("catalog")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: OEM Brands Supported */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white border-l-2 border-amber-500 pl-2">
              {t("brandsTitle")}
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="text-zinc-300 font-medium">Hyundai Mobis Original</li>
              <li className="text-zinc-300 font-medium">Kia Genuine Parts</li>
              <li className="text-zinc-300 font-medium">Genesis Luxury Genuine</li>
              <li className="text-zinc-300 font-medium">Mando & CTR Korea OEM</li>
              <li className="text-zinc-300 font-medium">Sangsin Brake & Valeo</li>
            </ul>
          </div>

          {/* Col 4: Baku & Seoul Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white border-l-2 border-amber-500 pl-2">
              {t("contactTitle")}
            </h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{tContact("bakuAddress")}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{tContact("phone")}</span>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/994507779988"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  {tContact("whatsapp")}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{tContact("email")}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <p>{t("copyright")}</p>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>Baku 🇦🇿</span>
            <span>⇄</span>
            <span>Seoul 🇰🇷</span>
            <span>
              <Link
                href="/login"
                className="opacity-40 hover:opacity-100 hover:text-amber-400 transition-opacity cursor-default select-none inline-block px-0.5"
                tabIndex={-1}
                aria-hidden="true"
              >
                •
              </Link>{" "}
              Direct Logistics
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
