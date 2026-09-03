import { prisma } from "@/lib/prisma";
import { Layers, Package, Sparkles } from "lucide-react";

export const revalidate = 0;

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany();
  const parts = await prisma.part.findMany();

  // Count parts per category
  const counts: Record<string, number> = {};
  for (const p of parts) {
    counts[p.category.toLowerCase()] =
      (counts[p.category.toLowerCase()] || 0) + 1;
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Product Categories ({categories.length})
        </h1>
        <p className="text-xs text-zinc-400">
          Component groups for Hyundai, Kia, and Genesis parts classification.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          let names: any = {};
          try {
            names = JSON.parse(cat.translations);
          } catch {}

          const partCount = counts[cat.slug.toLowerCase()] || 0;

          return (
            <div
              key={cat.id}
              className="rounded-2xl glass-panel p-5 border border-white/10 space-y-3 hover:border-amber-500/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-wider">
                  #{cat.slug}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-zinc-300 font-bold">
                  {partCount} parts
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-white text-base">
                  {names.en?.name || cat.slug}
                </h3>
                <div className="text-xs text-zinc-400">
                  🇦🇿 {names.az?.name || "-"}
                </div>
                <div className="text-xs text-zinc-400">
                  🇷🇺 {names.ru?.name || "-"}
                </div>
                <div className="text-xs text-zinc-400">
                  🇰🇷 {names.ko?.name || "-"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
