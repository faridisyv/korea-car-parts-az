"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import {
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  PhoneCall,
  Search,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import CurrencyToggle from "./CurrencyToggle";
import { useRequestModal } from "../request/RequestModalContext";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { openRequestModal } = useRequestModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Secret admin shortcut: Ctrl + Shift + A (or Cmd + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        router.push("/login");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/catalog", label: t("catalog") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-[#0a0c10]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50"
          : "py-5 bg-gradient-to-b from-black/80 via-black/40 to-transparent"
      }`}
    >
      <div className="container max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group shrink-0 focus:outline-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-600 flex items-center justify-center text-black font-black text-xl shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform">
            K
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                KOREA<span className="text-amber-400">PARTS</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                AZ
              </span>
            </div>
            <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider hidden sm:block">
              Hyundai • Kia Mobis Direct
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/5 rounded-2xl p-1.5 border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                    : "text-zinc-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Tools & Request CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Toggle */}
          <div className="hidden md:block">
            <CurrencyToggle />
          </div>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Request Part Popup CTA */}
          <Button
            onClick={() => openRequestModal()}
            variant="gold"
            size="sm"
            className="hidden sm:inline-flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)] animate-pulseGlow"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>{t("requestPart")}</span>
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[73px] bg-[#0a0c10]/98 border-b border-white/10 backdrop-blur-2xl p-5 shadow-2xl animate-in slide-in-from-top-4 duration-200 z-50">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <CurrencyToggle />
            </div>

            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
                      isActive
                        ? "bg-amber-500 text-black font-extrabold"
                        : "text-zinc-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-60" />
                  </Link>
                );
              })}
            </nav>

            <div className="pt-2">
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openRequestModal();
                }}
                variant="gold"
                className="w-full py-4 text-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t("requestPart")}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
