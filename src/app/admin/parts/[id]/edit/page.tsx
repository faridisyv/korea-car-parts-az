import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PartForm from "@/components/admin/PartForm";

export default async function EditPartPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const part = await prisma.part.findUnique({
    where: { id },
  });

  if (!part) {
    notFound();
  }

  return <PartForm initialData={part} partId={part.id} isEditing={true} />;
}
