"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";

const languages = [
  { code: "az", name: "Azərbaycan", flag: "🇦🇿", short: "AZE" },
  { code: "en", name: "English", flag: "🇺🇸", short: "ENG" },
  { code: "ru", name: "Русский", flag: "🇷🇺", short: "RUS" },
  { code: "ko", name: "한국어", flag: "🇰🇷", short: "KOR" },
] as const;

export default function LanguageSwitcher() {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang =
    languages.find((l) => l.code === currentLocale) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: "az" | "en" | "ru" | "ko") => {
    router.replace(pathname, { locale: code });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-700 text-xs font-semibold tracking-wide transition-all hover:border-blue-300"
        aria-label="Select Language"
      >
        <span className="text-base">{currentLang.flag}</span>
        <span className="hidden sm:inline font-bold text-slate-700">
          {currentLang.short}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-blue-600" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-white border border-slate-200 py-2 z-50 shadow-xl animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
            Select Language
          </div>
          {languages.map((lang) => {
            const isSelected = lang.code === currentLocale;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors ${
                  isSelected
                    ? "bg-blue-50 text-blue-700 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.name}</span>
                </div>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-blue-600" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
