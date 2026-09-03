import { z } from "zod";

export const inquiryRequestSchema = z.object({
  vinCode: z
    .string()
    .min(11, "VIN code must be at least 11 characters")
    .max(17, "VIN code cannot exceed 17 characters")
    .transform((v) => v.trim().toUpperCase()),
  partNumber: z.string().optional(),
  partName: z.string().min(2, "Part name or description is required"),
  carModel: z.string().min(2, "Car make and model is required"),
  carYear: z.coerce.number().min(1990).max(2027).optional(),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1").default(1),
  details: z.string().optional(),
  name: z.string().min(2, "Your name is required"),
  phone: z.string().min(6, "Valid phone number is required (WhatsApp enabled preferred)"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  urgency: z.enum(["standard", "express_air"]).default("standard"),
});

export type InquiryRequestInput = z.infer<typeof inquiryRequestSchema>;

export const partFormSchema = z.object({
  partNumber: z.string().min(3, "OEM Part number is required").toUpperCase(),
  brand: z.enum(["Hyundai", "Kia", "Genesis"]),
  category: z.string().min(2, "Category is required"),
  priceUSD: z.coerce.number().min(1, "Price in USD is required"),
  priceAZN: z.coerce.number().optional(),
  inStock: z.boolean().default(true),
  stockCount: z.coerce.number().min(0).default(5),
  location: z.string().default("Seoul Direct"),
  deliveryDays: z.string().default("4-7 days"),
  compatibleModels: z.string().min(2, "Compatible models are required"),
  oemBrand: z.string().default("Hyundai Mobis"),
  weightKg: z.coerce.number().optional(),
  featured: z.boolean().default(false),
  images: z.string().min(1, "At least one image URL is required"),
  nameEn: z.string().min(2, "English name is required"),
  descEn: z.string().default(""),
  nameAz: z.string().min(2, "Azerbaijani name is required"),
  descAz: z.string().default(""),
  nameRu: z.string().min(2, "Russian name is required"),
  descRu: z.string().default(""),
  nameKo: z.string().min(2, "Korean name is required"),
  descKo: z.string().default(""),
});

export type PartFormInput = z.infer<typeof partFormSchema>;

export const adminLoginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
