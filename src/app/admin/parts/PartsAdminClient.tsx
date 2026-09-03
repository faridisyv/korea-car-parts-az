"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Package,
  CheckCircle,
  XCircle,
  Warehouse,
  Plane,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PartsAdminClient({
  initialParts,
}: {
  initialParts: any[];
}) {
  const [parts, setParts] = useState(initialParts);
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");

  const handleDelete = async (id: string, partNumber: string) => {
    if (
      !confirm(
        `Are you sure you want to permanently delete part ${partNumber}?`
      )
    )
      return;

    try {
      const res = await fetch(`/api/parts/${id}`, { method: "DELETE" });
      if (res.ok) {
        setParts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error("Failed to delete part:", e);
    }
  };

  const filteredParts = parts.filter((part) => {
    if (selectedBrand !== "all" && part.brand !== selectedBrand) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        part.partNumber.toLowerCase().includes(q) ||
        part.brand.toLowerCase().includes(q) ||
        part.category.toLowerCase().includes(q) ||
        part.compatibleModels.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            OEM Parts Inventory ({parts.length})
          </h1>
          <p className="text-xs text-zinc-400">
            Create, edit, and configure catalog listings for Hyundai, Kia, and Genesis.
          </p>
        </div>

        <Link href="/admin/parts/new">
          <Button variant="gold" size="sm" className="text-xs font-bold">
            <PlusCircle className="w-4 h-4 mr-1.5" />
            Add New Part
          </Button>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search part number, brand, model..."
            className="pl-9 text-xs h-9 bg-black/40"
          />
        </div>

        <div className="flex items-center gap-2">
          {["all", "Hyundai", "Kia", "Genesis"].map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedBrand === b
                  ? "bg-amber-500 text-black font-extrabold shadow-sm"
                  : "bg-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              {b.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Parts Table */}
      <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/80 border-b border-white/10 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Media & OEM No.</th>
                <th className="p-4">Brand & Category</th>
                <th className="p-4">Vehicle Compatibility</th>
                <th className="p-4">Price (USD / AZN)</th>
                <th className="p-4">Stock & Location</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredParts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500">
                    No parts found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredParts.map((part) => {
                  let img =
                    "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=800&auto=format&fit=crop&q=80";
                  try {
                    const parsed = JSON.parse(part.images);
                    if (Array.isArray(parsed) && parsed.length > 0)
                      img = parsed[0];
                  } catch {}

                  let name = part.partNumber;
                  try {
                    const trans = JSON.parse(part.translations);
                    if (trans.en?.name || trans.az?.name) {
                      name = trans.en?.name || trans.az?.name;
                    }
                  } catch {}

                  return (
                    <tr
                      key={part.id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      {/* Media & Number */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black border border-white/10 shrink-0">
                            <Image
                              src={img}
                              alt={name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-mono font-bold text-amber-400 text-sm">
                              {part.partNumber}
                            </span>
                            <div className="text-[11px] text-zinc-300 line-clamp-1 max-w-[200px]">
                              {name}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Brand & Category */}
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white font-bold text-[11px]">
                          {part.brand}
                        </span>
                        <div className="text-[10px] text-zinc-400 uppercase tracking-wider mt-1">
                          {part.category}
                        </div>
                      </td>

                      {/* Compatibility */}
                      <td className="p-4 max-w-xs">
                        <p className="text-zinc-300 line-clamp-2 text-xs">
                          {part.compatibleModels}
                        </p>
                      </td>

                      {/* Price */}
                      <td className="p-4 font-mono">
                        <div className="font-black text-white text-sm">
                          ${part.priceUSD}
                        </div>
                        <span className="text-[11px] text-amber-400">
                          {part.priceAZN ? `${part.priceAZN} ₼` : `≈ ${(part.priceUSD * 1.7).toFixed(0)} ₼`}
                        </span>
                      </td>

                      {/* Stock & Location */}
                      <td className="p-4">
                        <div className="flex items-center gap-1.5 text-xs font-bold">
                          {part.inStock ? (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle className="w-3.5 h-3.5" />
                              {part.stockCount} in stock
                            </span>
                          ) : (
                            <span className="text-red-400 flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5" />
                              Pre-order
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-zinc-400 flex items-center gap-1 mt-1">
                          {part.location.includes("Baku") ? (
                            <Warehouse className="w-3 h-3 text-zinc-500" />
                          ) : (
                            <Plane className="w-3 h-3 text-zinc-500" />
                          )}
                          {part.location}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/az/catalog/${part.id}`}
                            target="_blank"
                            className="p-2 rounded-xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                            title="View Public Page"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          <Link
                            href={`/admin/parts/${part.id}/edit`}
                            className="p-2 rounded-xl bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-black border border-amber-500/30 transition-all"
                            title="Edit Part"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() =>
                              handleDelete(part.id, part.partNumber)
                            }
                            className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 transition-all"
                            title="Delete Part"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
