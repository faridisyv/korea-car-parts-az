import { prisma } from "@/lib/prisma";
import PartsAdminClient from "./PartsAdminClient";

export const revalidate = 0;

export default async function AdminPartsPage() {
  const parts = await prisma.part.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <PartsAdminClient initialParts={parts} />;
}
