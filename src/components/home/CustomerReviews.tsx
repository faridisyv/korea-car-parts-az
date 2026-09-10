"use client";

import { useTranslations } from "next-intl";
import { Star, CheckCircle, Quote, ShieldCheck, ThumbsUp } from "lucide-react";

export default function CustomerReviews() {
  const t = useTranslations("reviews");

  const reviews = [
    {
      id: "1",
      name: "Tural Aliyev",
      car: "Hyundai Sonata 2.0 Turbo (2021)",
      part: "Front Brake Pads & Discs (Mobis OEM)",
      rating: 5,
      date: "2 days ago",
      text: "I was looking all over Baku for original Mobis front discs. Found them here, and they arrived in 5 days straight from Seoul. Hologram verified, perfect fitment.",
      deliveryCity: "Baku (Yasamal)",
    },
    {
      id: "2",
      name: "Rashad Mammadov",
      car: "Kia K5 1.6T (2022)",
      part: "LED Headlight Assembly & Air Filter",
      rating: 5,
      date: "1 week ago",
      text: "The VIN compatibility check before shipping gave me peace of mind. The team double-checked the part number against my chassis code. Excellent service!",
      deliveryCity: "Baku (Narimanov)",
    },
    {
      id: "3",
      name: "Elnur Hasanov",
      car: "Hyundai Tucson 2.0 CRDi (2020)",
      part: "Complete Timing Belt Kit + Water Pump",
      rating: 5,
      date: "2 weeks ago",
      text: "Wholesale pricing is genuinely lower than local retailers, and you are 100% sure it's not a Chinese knockoff. Highly recommend to all Hyundai drivers.",
      deliveryCity: "Baku (Babek Ave)",
    },
  ];

  return (
    <section className="py-16 bg-[#F8FAFC] border-t border-slate-200/70 relative">
      <div className="container max-w-7xl mx-auto px-4 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <ThumbsUp className="w-3.5 h-3.5" />
            {t("badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-sm text-slate-500">
            {t("subtitle")}
          </p>

          {/* Rating aggregate bar */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-extrabold text-sm text-slate-800">{t("ratingValue")}</span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">{t("ratingCount")}</span>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl p-6 bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-0.5"
            >
              <div className="space-y-3">
                {/* Stars and date */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.date}</span>
                </div>

                {/* Review Text */}
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{rev.text}"
                </p>

                {/* Part & Car Tag */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] space-y-0.5">
                  <span className="font-bold text-slate-800 block">{rev.car}</span>
                  <span className="text-blue-600 font-medium">{rev.part}</span>
                </div>
              </div>

              {/* Author & Verification */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{rev.name}</h4>
                  <span className="text-[10px] text-slate-400">{rev.deliveryCity}</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                  <CheckCircle className="w-3 h-3" />
                  {t("verified")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
