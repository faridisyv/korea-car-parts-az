import { getStatusColor } from "@/lib/utils";

export default function StatusBadge({ status }: { status: string }) {
  const colorClass = getStatusColor(status);
  const formatted = status.replace("_", " ").toUpperCase();

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${colorClass}`}
    >
      {formatted}
    </span>
  );
}
