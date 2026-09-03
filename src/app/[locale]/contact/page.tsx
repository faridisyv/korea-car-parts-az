"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 pt-32 pb-24 space-y-12">
      {/* Header Banner */}
      <div className="rounded-3xl glass-panel p-8 sm:p-14 border border-white/10 relative overflow-hidden text-center max-w-4xl mx-auto">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            24/7 Logistics Support
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t("title")}
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Offices & Contact Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
        {/* Left Col: Baku & Seoul Offices Info */}
        <div className="lg:col-span-5 space-y-6">
          {/* Baku Office */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🇦🇿</span>
              <h3 className="font-bold text-white text-base">
                {t("bakuTitle")}
              </h3>
            </div>
            <p className="text-xs text-zinc-400 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{t("bakuAddress")}</span>
            </p>
            <p className="text-xs text-zinc-400 flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t("phone")}</span>
            </p>
            <p className="text-xs text-zinc-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t("workingHours")}</span>
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/821048695673"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: {t("whatsapp")}</span>
              </a>
            </div>
          </div>

          {/* Seoul Office */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🇰🇷</span>
              <h3 className="font-bold text-white text-base">
                {t("seoulTitle")}
              </h3>
            </div>
            <p className="text-xs text-zinc-400 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{t("seoulAddress")}</span>
            </p>
            <p className="text-xs text-zinc-400 flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t("email")}</span>
            </p>
          </div>
        </div>

        {/* Right Col: Interactive Message Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl glass-panel p-8 border border-white/10 space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">
                {t("sendMessage")}
              </h3>
              <p className="text-xs text-zinc-400">
                Send us an inquiry or question and we will reply within 2 hours.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-white">
                    Message Sent!
                  </h4>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                    Thank you for contacting Korea Car Parts AZ. Our team will reach out shortly.
                  </p>
                </div>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  size="sm"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Your Name *
                    </label>
                    <Input required placeholder="e.g. Samir Aliyev" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      Phone Number (WhatsApp) *
                    </label>
                    <Input required placeholder="+994 50 123 45 67" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Email Address (Optional)
                  </label>
                  <Input type="email" placeholder="samir@example.com" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">
                    Your Message / Part Inquiry *
                  </label>
                  <Textarea
                    required
                    rows={4}
                    placeholder="Tell us what Hyundai or Kia part or assistance you need..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="gold"
                  disabled={isSubmitting}
                  className="w-full py-4 text-sm font-bold uppercase tracking-wider"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      <span>{t("sendBtn")}</span>
                    </div>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
