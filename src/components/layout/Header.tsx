"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import {
  Menu,
  X,
  Sparkles,
  ShoppingBag,
  Car,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import CurrencyToggle from "./CurrencyToggle";
import { useRequestModal } from "../request/RequestModalContext";
import { useCart } from "@/components/cart/CartContext";
import { useGarage } from "@/components/garage/GarageContext";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { openRequestModal } = useRequestModal();
  const { totalItems, openCart } = useCart();
  const { vehicle } = useGarage();
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
          ? "py-3 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm shadow-slate-200/50"
          : "py-5 bg-white/80 backdrop-blur-sm border-b border-slate-100"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group shrink-0 focus:outline-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
            K
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg sm:text-xl tracking-tight text-slate-800 group-hover:text-blue-600 transition-colors">
                KOREA<span className="text-blue-600">PARTS</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200">
                AZ
              </span>
            </div>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider hidden sm:block">
              Hyundai • Kia Mobis Direct
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100 rounded-2xl p-1.5">
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
                    ? "bg-white text-blue-600 shadow-sm border border-slate-200"
                    : "text-slate-500 hover:text-slate-800 hover:bg-white/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Toggle */}
          <div className="hidden md:block">
            <CurrencyToggle />
          </div>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* My Garage Badge */}
          {vehicle && (
            <Link
              href="/catalog"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition-colors"
            >
              <Car className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </span>
            </Link>
          )}

          {/* Cart Button */}
          <button
            onClick={openCart}
            id="header-cart-btn"
            className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-blue-50 border border-transparent hover:border-blue-200 text-slate-500 hover:text-blue-600 transition-all"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shadow-md">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>

          {/* Request Part CTA */}
          <Button
            onClick={() => openRequestModal()}
            variant="default"
            size="sm"
            className="hidden sm:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t("requestPart")}</span>
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800"
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
        <div className="lg:hidden fixed inset-x-0 top-[73px] bg-white border-b border-slate-200 p-5 shadow-lg animate-in slide-in-from-top-4 duration-200 z-50">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
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
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </Link>
                );
              })}
            </nav>

            <div className="pt-2 grid grid-cols-2 gap-2">
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openRequestModal();
                }}
                className="w-full py-4 text-sm flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t("requestPart")}</span>
              </Button>
              <button
                onClick={() => { setMobileMenuOpen(false); openCart(); }}
                className="relative w-full py-4 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Cart
                {totalItems > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
