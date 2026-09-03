"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
  inquiryRequestSchema,
  type InquiryRequestInput,
} from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Car,
  Hash,
  Phone,
  User,
  Mail,
  FileText,
  Clock,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  HelpCircle,
  Plane,
  Truck,
} from "lucide-react";
import { type RequestModalPrefill } from "./RequestModalContext";

interface RequestFormProps {
  prefill?: RequestModalPrefill;
  onSuccess?: () => void;
}

export default function RequestForm({ prefill, onSuccess }: RequestFormProps) {
  const t = useTranslations("requestModal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    id: string;
    phone: string;
    partName: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<InquiryRequestInput>({
    resolver: zodResolver(inquiryRequestSchema),
    defaultValues: {
      vinCode: "",
      partNumber: prefill?.partNumber || "",
      partName: prefill?.partName || "",
      carModel: prefill?.carModel || "",
      carYear: prefill?.carYear || undefined,
      quantity: 1,
      name: "",
      phone: "+82 ",
      email: "",
      details: "",
      urgency: "standard",
    },
  });

  useEffect(() => {
    if (prefill) {
      if (prefill.partNumber) setValue("partNumber", prefill.partNumber);
      if (prefill.partName) setValue("partName", prefill.partName);
      if (prefill.carModel) setValue("carModel", prefill.carModel);
      if (prefill.carYear) setValue("carYear", prefill.carYear);
    }
  }, [prefill, setValue]);

  const selectedUrgency = watch("urgency");
  const vinValue = watch("vinCode");

  const onSubmit = async (data: InquiryRequestInput) => {
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to submit request");
      }

      const result = await res.json();
      setSubmittedData({
        id: result.id,
        phone: data.phone,
        partName: data.partName,
      });

      if (onSuccess) onSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedData) {
    const cleanPhone = submittedData.phone.replace(/[^0-9]/g, "");
    const waText = encodeURIComponent(
      `Hello Korea Car Parts AZ! I submitted inquiry #${submittedData.id} for: ${submittedData.partName}. Please check price & shipping.`
    );
    const waLink = `https://wa.me/821048695673?text=${waText}`;

    return (
      <div className="text-center py-6 px-4 space-y-6">
        <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-white">
            {t("successTitle")}
          </h3>
          <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
            {t("successMsg")}
          </p>
          <div className="inline-block px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-amber-400 mt-2">
            Inquiry Ref ID: #{submittedData.id.slice(-8).toUpperCase()}
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
          >
            <MessageCircle className="w-4 h-4" />
            {t("openWhatsapp")}
          </a>
          <Button
            variant="outline"
            onClick={() => {
              setSubmittedData(null);
              reset();
            }}
          >
            {t("close")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-1">
      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-medium">
          {errorMsg}
        </div>
      )}

      {/* Section: Vehicle & Part Identification */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* VIN Code */}
        <div className="space-y-1.5 md:col-span-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5" />
              {t("vinLabel")}
            </label>
            <span className="text-[11px] text-zinc-400 font-mono">
              {vinValue ? `${vinValue.length}/17` : "17 chars"}
            </span>
          </div>
          <Input
            {...register("vinCode")}
            placeholder={t("vinPlaceholder")}
            maxLength={17}
            className="uppercase font-mono text-sm tracking-wider bg-black/40 border-amber-500/30 focus:border-amber-400"
          />
          {errors.vinCode && (
            <p className="text-[11px] text-red-400">{errors.vinCode.message}</p>
          )}
          <p className="text-[11px] text-zinc-400 flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-zinc-500 shrink-0" />
            {t("vinTooltip")}
          </p>
        </div>

        {/* Car Model */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-zinc-400" />
            {t("carModelLabel")}
          </label>
          <Input
            {...register("carModel")}
            placeholder={t("carModelPlaceholder")}
            className="bg-black/40"
          />
          {errors.carModel && (
            <p className="text-[11px] text-red-400">{errors.carModel.message}</p>
          )}
        </div>

        {/* Car Year */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            {t("carYearLabel")}
          </label>
          <Input
            {...register("carYear")}
            type="number"
            placeholder="e.g. 2021"
            className="bg-black/40"
          />
          {errors.carYear && (
            <p className="text-[11px] text-red-400">{errors.carYear.message}</p>
          )}
        </div>

        {/* Part Name / Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            {t("partNameLabel")}
          </label>
          <Input
            {...register("partName")}
            placeholder={t("partNamePlaceholder")}
            className="bg-black/40"
          />
          {errors.partName && (
            <p className="text-[11px] text-red-400">{errors.partName.message}</p>
          )}
        </div>

        {/* OEM Part Number */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-zinc-400" />
            {t("partNumberLabel")}
          </label>
          <Input
            {...register("partNumber")}
            placeholder={t("partNumberPlaceholder")}
            className="uppercase font-mono bg-black/40"
          />
        </div>

        {/* Quantity */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300">
            {t("quantityLabel")}
          </label>
          <Input
            {...register("quantity")}
            type="number"
            min={1}
            defaultValue={1}
            className="bg-black/40"
          />
          {errors.quantity && (
            <p className="text-[11px] text-red-400">{errors.quantity.message}</p>
          )}
        </div>

        {/* Urgency */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300">
            {t("urgencyLabel")}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setValue("urgency", "standard")}
              className={`p-2.5 rounded-xl border text-xs flex flex-col items-center gap-1 transition-all ${
                selectedUrgency === "standard"
                  ? "border-amber-500 bg-amber-500/15 text-amber-300 font-bold"
                  : "border-white/10 bg-black/40 text-zinc-400 hover:border-white/20"
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Standard (5-8d)</span>
            </button>
            <button
              type="button"
              onClick={() => setValue("urgency", "express_air")}
              className={`p-2.5 rounded-xl border text-xs flex flex-col items-center gap-1 transition-all ${
                selectedUrgency === "express_air"
                  ? "border-amber-500 bg-amber-500/15 text-amber-300 font-bold"
                  : "border-white/10 bg-black/40 text-zinc-400 hover:border-white/20"
              }`}
            >
              <Plane className="w-4 h-4" />
              <span>Express (3-5d)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Customer Contact Section */}
      <div className="border-t border-white/10 pt-3 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-zinc-400" />
              {t("nameLabel")}
            </label>
            <Input
              {...register("name")}
              placeholder={t("namePlaceholder")}
              className="bg-black/40"
            />
            {errors.name && (
              <p className="text-[11px] text-red-400">{errors.name.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              {t("phoneLabel")}
            </label>
            <Input
              {...register("phone")}
              placeholder={t("phonePlaceholder")}
              className="bg-black/40 font-mono"
            />
            {errors.phone && (
              <p className="text-[11px] text-red-400">{errors.phone.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              {t("emailLabel")}
            </label>
            <Input
              {...register("email")}
              type="email"
              placeholder={t("emailPlaceholder")}
              className="bg-black/40"
            />
            {errors.email && (
              <p className="text-[11px] text-red-400">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Details & Notes */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-zinc-400" />
            {t("detailsLabel")}
          </label>
          <Textarea
            {...register("details")}
            rows={2}
            placeholder={t("detailsPlaceholder")}
            className="bg-black/40 min-h-[70px]"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="gold"
          disabled={isSubmitting}
          className="w-full py-4 text-base shadow-xl"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <span>{t("submitting")}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>{t("submitButton")}</span>
            </div>
          )}
        </Button>
      </div>
    </form>
  );
}
