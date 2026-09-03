import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { partFormSchema } from "@/lib/validators";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const part = await prisma.part.findFirst({
      where: {
        OR: [{ id }, { partNumber: id }],
      },
    });

    if (!part) {
      return NextResponse.json({ error: "Part not found" }, { status: 404 });
    }

    return NextResponse.json(part);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const validated = partFormSchema.parse(body);

    const translations = JSON.stringify({
      en: { name: validated.nameEn, desc: validated.descEn },
      az: { name: validated.nameAz, desc: validated.descAz },
      ru: { name: validated.nameRu, desc: validated.descRu },
      ko: { name: validated.nameKo, desc: validated.descKo },
    });

    let imagesStr = validated.images;
    if (!imagesStr.startsWith("[")) {
      imagesStr = JSON.stringify(
        imagesStr
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      );
    }

    const updated = await prisma.part.update({
      where: { id },
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

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("Error updating part:", err);
    return NextResponse.json(
      { error: err.errors ? err.errors[0].message : "Failed to update part" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    await prisma.part.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete part" },
      { status: 500 }
    );
  }
}
