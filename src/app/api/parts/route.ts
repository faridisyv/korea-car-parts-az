import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { partFormSchema } from "@/lib/validators";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const brand = searchParams.get("brand");
    const category = searchParams.get("category");
    const search = searchParams.get("q");

    const where: any = {};
    if (brand && brand !== "All") where.brand = brand;
    if (category && category !== "all") where.category = category;
    if (search) {
      where.OR = [
        { partNumber: { contains: search } },
        { brand: { contains: search } },
        { compatibleModels: { contains: search } },
      ];
    }

    const parts = await prisma.part.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(parts);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch parts" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = partFormSchema.parse(body);

    const translations = JSON.stringify({
      en: { name: validated.nameEn, desc: validated.descEn },
      az: { name: validated.nameAz, desc: validated.descAz },
      ru: { name: validated.nameRu, desc: validated.descRu },
      ko: { name: validated.nameKo, desc: validated.descKo },
    });

    // Check if images is string or JSON array
    let imagesStr = validated.images;
    if (!imagesStr.startsWith("[")) {
      imagesStr = JSON.stringify(
        imagesStr
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      );
    }

    const part = await prisma.part.create({
      data: {
        partNumber: validated.partNumber,
        brand: validated.brand,
        category: validated.category,
        priceUSD: validated.priceUSD,
        priceAZN: validated.priceAZN || Math.round(validated.priceUSD * 1.7),
        inStock: validated.inStock,
        stockCount: validated.stockCount,
        location: validated.location,
        deliveryDays: validated.deliveryDays,
        compatibleModels: validated.compatibleModels,
        oemBrand: validated.oemBrand,
        weightKg: validated.weightKg || null,
        featured: validated.featured,
        images: imagesStr,
        translations,
      },
    });

    return NextResponse.json(part, { status: 201 });
  } catch (err: any) {
    console.error("Error creating part:", err);
    return NextResponse.json(
      { error: err.errors ? err.errors[0].message : "Failed to create part" },
      { status: 400 }
    );
  }
}
