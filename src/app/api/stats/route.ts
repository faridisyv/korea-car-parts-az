import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalParts = await prisma.part.count();
    const totalRequests = await prisma.inquiryRequest.count();
    const newRequests = await prisma.inquiryRequest.count({
      where: { status: "new" },
    });
    const quotedRequests = await prisma.inquiryRequest.count({
      where: { status: "quoted" },
    });
    const fulfilledRequests = await prisma.inquiryRequest.count({
      where: { status: "fulfilled" },
    });

    // Recent requests
    const recentRequests = await prisma.inquiryRequest.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    // Low stock parts
    const lowStockParts = await prisma.part.findMany({
      where: { stockCount: { lte: 4 } },
      take: 4,
    });

    return NextResponse.json({
      totalParts,
      totalRequests,
      newRequests,
      quotedRequests,
      fulfilledRequests,
      recentRequests,
      lowStockParts,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
