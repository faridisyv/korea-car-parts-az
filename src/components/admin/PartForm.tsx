"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { partFormSchema, type PartFormInput } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Package,
  Hash,
  DollarSign,
  Car,
  Globe,
  Image as ImageIcon,
  Save,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface PartFormProps {
  initialData?: any;
  partId?: string;
  isEditing?: boolean;
}

export default function PartForm({
  initialData,
  partId,
  isEditing = false,
}: PartFormProps) {
  const router = useRouter();
  const [activeLangTab, setActiveLangTab] = useState<"en" | "az" | "ru" | "ko">("az");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Extract initial translations if editing
  let initialTranslations: any = { en: {}, az: {}, ru: {}, ko: {} };
  if (initialData?.translations) {
    try {
      initialTranslations =
        typeof initialData.translations === "string"
          ? JSON.parse(initialData.translations)
          : initialData.translations;
    } catch {}
  }

  // Extract images
  let initialImages = initialData?.images || "";
  if (Array.isArray(initialImages)) {
    initialImages = initialImages.join(", ");
  } else if (typeof initialImages === "string" && initialImages.startsWith("[")) {
    try {
      initialImages = JSON.parse(initialImages).join(", ");
    } catch {}
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PartFormInput>({
    resolver: zodResolver(partFormSchema),
    defaultValues: {
      partNumber: initialData?.partNumber || "",
      brand: initialData?.brand || "Hyundai",
      category: initialData?.category || "engine",
      priceUSD: initialData?.priceUSD || 50,
      priceAZN: initialData?.priceAZN || 85,
      inStock: initialData?.inStock !== undefined ? initialData.inStock : true,
      stockCount: initialData?.stockCount || 5,
      location: initialData?.location || "Seoul Direct",
      deliveryDays: initialData?.deliveryDays || "4-7 days",
      compatibleModels: initialData?.compatibleModels || "",
      oemBrand: initialData?.oemBrand || "Hyundai Mobis",
      weightKg: initialData?.weightKg || undefined,
      featured: initialData?.featured || false,
      images:
        initialImages ||
        "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=800&auto=format&fit=crop&q=80",
      nameEn: initialTranslations.en?.name || "",
      descEn: initialTranslations.en?.desc || "",
      nameAz: initialTranslations.az?.name || "",
      descAz: initialTranslations.az?.desc || "",
      nameRu: initialTranslations.ru?.name || "",
      descRu: initialTranslations.ru?.desc || "",
      nameKo: initialTranslations.ko?.name || "",
      descKo: initialTranslations.ko?.desc || "",
    },
  });

  const priceUSDValue = watch("priceUSD");

  const onSubmit = async (data: PartFormInput) => {
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const url = isEditing ? `/api/parts/${partId}` : "/api/parts";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save part");
      }

      router.push("/admin/parts");
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save part");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/parts"
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-2xl font-black text-white">
            {isEditing ? "Edit Part Listing" : "Create New OEM Part Listing"}
          </h1>
        </div>

        <Button
          type="submit"
          variant="gold"
          disabled={isSubmitting}
          className="text-xs font-bold"
        >
          <Save className="w-4 h-4 mr-1.5" />
          {isSubmitting ? "Saving..." : "Save Part"}
        </Button>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-medium">
          {errorMsg}
        </div>
      )}

      {/* Basic Part Identity */}
      <div className="rounded-3xl glass-panel p-6 border border-white/10 space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-white border-l-2 border-amber-500 pl-2">
          1. OEM Identification & Categorization
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              OEM Part Number *
            </label>
            <Input
              {...register("partNumber")}
              placeholder="e.g. 58101-C1A00"
              className="bg-black/40 uppercase font-mono"
            />
            {errors.partNumber && (
              <p className="text-[11px] text-red-400">
                {errors.partNumber.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              Brand *
            </label>
            <select
              {...register("brand")}
              className="w-full h-11 rounded-xl bg-zinc-900 border border-white/10 px-3 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="Hyundai">Hyundai</option>
              <option value="Kia">Kia</option>
              <option value="Genesis">Genesis</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              Category *
            </label>
            <select
              {...register("category")}
              className="w-full h-11 rounded-xl bg-zinc-900 border border-white/10 px-3 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="engine">Engine & Drivetrain</option>
              <option value="brakes">Brakes & Discs</option>
              <option value="suspension">Suspension & Steering</option>
              <option value="electrical">Electronics & Lighting</option>
              <option value="body">Body Parts</option>
              <option value="filters">Filters & Maintenance</option>
              <option value="transmission">Transmission</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              OEM Manufacturer Tag
            </label>
            <Input
              {...register("oemBrand")}
              placeholder="e.g. Hyundai Mobis Genuine"
              className="bg-black/40"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              Compatible Vehicles / Models *
            </label>
            <Input
              {...register("compatibleModels")}
              placeholder="e.g. Sonata LF 2015-2019, Kia K5 2016-2020"
              className="bg-black/40"
            />
            {errors.compatibleModels && (
              <p className="text-[11px] text-red-400">
                {errors.compatibleModels.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Pricing & Stock Management */}
      <div className="rounded-3xl glass-panel p-6 border border-white/10 space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-white border-l-2 border-amber-500 pl-2">
          2. Pricing & Logistics
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              Price (USD $) *
            </label>
            <Input
              {...register("priceUSD")}
              type="number"
              step="0.01"
              className="bg-black/40 font-mono"
            />
            {errors.priceUSD && (
              <p className="text-[11px] text-red-400">
                {errors.priceUSD.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              Price (AZN ₼ approx)
            </label>
            <Input
              {...register("priceAZN")}
              type="number"
              placeholder={String(Math.round((priceUSDValue || 0) * 1.7))}
              className="bg-black/40 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              Stock Quantity
            </label>
            <Input
              {...register("stockCount")}
              type="number"
              className="bg-black/40 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              Weight (Kg)
            </label>
            <Input
              {...register("weightKg")}
              type="number"
              step="0.1"
              placeholder="e.g. 2.5"
              className="bg-black/40 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              Stock Location
            </label>
            <select
              {...register("location")}
              className="w-full h-11 rounded-xl bg-zinc-900 border border-white/10 px-3 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="Baku Warehouse">Baku Warehouse (24h)</option>
              <option value="Seoul Direct">Seoul Direct (4-7d)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              Delivery Days Text
            </label>
            <Input
              {...register("deliveryDays")}
              placeholder="e.g. 24 hours or 4-7 days"
              className="bg-black/40"
            />
          </div>

          <div className="flex items-center gap-6 pt-6">
            <label className="flex items-center gap-2 text-xs font-semibold text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                {...register("inStock")}
                className="w-4 h-4 rounded text-amber-500"
              />
              <span>In Stock</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                {...register("featured")}
                className="w-4 h-4 rounded text-amber-500"
              />
              <span>Featured on Homepage</span>
            </label>
          </div>
        </div>
      </div>

      {/* Multilingual Part Names & Descriptions */}
      <div className="rounded-3xl glass-panel p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider text-white border-l-2 border-amber-500 pl-2">
            3. Multilingual Translations (4 Languages)
          </h3>

          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            {[
              { id: "az", label: "🇦🇿 AZ" },
              { id: "en", label: "🇺🇸 EN" },
              { id: "ru", label: "🇷🇺 RU" },
              { id: "ko", label: "🇰🇷 KO" },
            ].map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveLangTab(tab.id as any)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeLangTab === tab.id
                    ? "bg-amber-500 text-black font-extrabold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Azerbaijani Inputs */}
        <div className={activeLangTab === "az" ? "space-y-4" : "hidden"}>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              Part Name (Azerbaijani) *
            </label>
            <Input
              {...register("nameAz")}
              placeholder="məsələn: Qabaq Orijinal Əyləc Nakladkası"
              className="bg-black/40"
            />
            {errors.nameAz && (
              <p className="text-[11px] text-red-400">{errors.nameAz.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              Description (Azerbaijani)
            </label>
            <Textarea
              {...register("descAz")}
              rows={3}
              placeholder="Orijinal Koreya Mobis keyfiyyətli detal..."
              className="bg-black/40"
            />
          </div>
        </div>

        {/* English Inputs */}
        <div className={activeLangTab === "en" ? "space-y-4" : "hidden"}>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              Part Name (English) *
            </label>
            <Input
              {...register("nameEn")}
              placeholder="e.g. Front OEM Ceramic Brake Pads Set"
              className="bg-black/40"
            />
            {errors.nameEn && (
              <p className="text-[11px] text-red-400">{errors.nameEn.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              Description (English)
            </label>
            <Textarea
              {...register("descEn")}
              rows={3}
              placeholder="Original factory-spec Mobis part..."
              className="bg-black/40"
            />
          </div>
        </div>

        {/* Russian Inputs */}
        <div className={activeLangTab === "ru" ? "space-y-4" : "hidden"}>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              Part Name (Russian) *
            </label>
            <Input
              {...register("nameRu")}
              placeholder="напр.: Комплект передних тормозных колодок Mobis"
              className="bg-black/40"
            />
            {errors.nameRu && (
              <p className="text-[11px] text-red-400">{errors.nameRu.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              Description (Russian)
            </label>
            <Textarea
              {...register("descRu")}
              rows={3}
              placeholder="Оригинальные заводские детали..."
              className="bg-black/40"
            />
          </div>
        </div>

        {/* Korean Inputs */}
        <div className={activeLangTab === "ko" ? "space-y-4" : "hidden"}>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              Part Name (Korean) *
            </label>
            <Input
              {...register("nameKo")}
              placeholder="예: 프론트 순정 세라믹 브레이크 패드 세트"
              className="bg-black/40"
            />
            {errors.nameKo && (
              <p className="text-[11px] text-red-400">{errors.nameKo.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              Description (Korean)
            </label>
            <Textarea
              {...register("descKo")}
              rows={3}
              placeholder="현대 모비스 100% 정품 부품..."
              className="bg-black/40"
            />
          </div>
        </div>
      </div>

      {/* Image URLs */}
      <div className="rounded-3xl glass-panel p-6 border border-white/10 space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-white border-l-2 border-amber-500 pl-2">
          4. Photos & Media URLs
        </h3>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-zinc-400" />
            Image URLs (Comma separated or Cloudinary URL) *
          </label>
          <Input
            {...register("images")}
            placeholder="https://images.unsplash.com/..., https://..."
            className="bg-black/40 font-mono text-xs"
          />
          {errors.images && (
            <p className="text-[11px] text-red-400">{errors.images.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Link href="/admin/parts">
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </Link>
        <Button
          type="submit"
          variant="gold"
          size="lg"
          disabled={isSubmitting}
          className="text-sm font-bold"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSubmitting ? "Saving..." : isEditing ? "Update Part" : "Publish Part Listing"}
        </Button>
      </div>
    </form>
  );
}
