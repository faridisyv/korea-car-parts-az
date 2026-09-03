import { prisma } from "@/lib/prisma";
import CatalogClient from "./CatalogClient";
import { type PartItem } from "@/components/catalog/PartCard";

export const revalidate = 30;

export default async function CatalogPage() {
  let parts: PartItem[] = [];
  try {
    const dbParts = await prisma.part.findMany({
      orderBy: { createdAt: "desc" },
    });
    parts = dbParts as unknown as PartItem[];
  } catch (e) {
    console.error("Error fetching catalog parts:", e);
  }

  return <CatalogClient initialParts={parts} />;
}
