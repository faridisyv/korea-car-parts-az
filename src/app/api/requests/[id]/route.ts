import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const inquiry = await prisma.inquiryRequest.findUnique({
      where: { id },
    });

    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json(inquiry);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { status, quotePriceUSD, adminNotes } = body;

    const updated = await prisma.inquiryRequest.update({
      where: { id },
      data: {
        ...(status !== undefined && { status }),
        ...(quotePriceUSD !== undefined && {
          quotePriceUSD: quotePriceUSD ? parseFloat(quotePriceUSD) : null,
        }),
        ...(adminNotes !== undefined && { adminNotes }),
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Error updating inquiry:", err);
    return NextResponse.json(
      { error: "Failed to update inquiry" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    await prisma.inquiryRequest.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}
