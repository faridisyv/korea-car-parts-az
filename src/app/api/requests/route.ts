import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { inquiryRequestSchema } from "@/lib/validators";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = inquiryRequestSchema.parse(body);

    const inquiry = await prisma.inquiryRequest.create({
      data: {
        vinCode: validated.vinCode,
        partNumber: validated.partNumber || null,
        partName: validated.partName,
        carModel: validated.carModel,
        carYear: validated.carYear || null,
        quantity: validated.quantity,
        details: validated.details || null,
        name: validated.name,
        phone: validated.phone,
        email: validated.email || null,
        urgency: validated.urgency,
        status: "new",
      },
    });

    return NextResponse.json({ success: true, id: inquiry.id }, { status: 201 });
  } catch (err: any) {
    console.error("Error creating inquiry request:", err);
    return NextResponse.json(
      { error: err.errors ? err.errors[0].message : "Failed to create inquiry" },
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const query = searchParams.get("q");

    const where: any = {};
    if (status && status !== "all") {
      where.status = status;
    }
    if (query) {
      where.OR = [
        { vinCode: { contains: query } },
        { name: { contains: query } },
        { phone: { contains: query } },
        { partName: { contains: query } },
        { partNumber: { contains: query } },
      ];
    }

    const requests = await prisma.inquiryRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(requests);
  } catch (err) {
    console.error("Error fetching requests:", err);
    return NextResponse.json(
      { error: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}
