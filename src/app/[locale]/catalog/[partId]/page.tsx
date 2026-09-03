import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PartDetailClient from "./PartDetailClient";
import { type PartItem } from "@/components/catalog/PartCard";

export const revalidate = 30;

export default async function PartDetailPage({
  params: { partId },
}: {
  params: { partId: string; locale: string };
}) {
  let part: PartItem | null = null;
  try {
    const dbPart = await prisma.part.findFirst({
      where: {
        OR: [{ id: partId }, { partNumber: partId }],
      },
    });

    if (!dbPart) {
      notFound();
    }

    part = dbPart as unknown as PartItem;
  } catch (err) {
    console.error("Error fetching single part:", err);
    notFound();
  }

  return <PartDetailClient part={part} />;
}
