import { prisma } from "@/lib/prisma";
import Link from "next/link";
import StatsCards from "@/components/admin/StatsCards";
import RequestsTable, {
  type InquiryItem,
} from "@/components/admin/RequestsTable";
import {
  Package,
  PlusCircle,
  ExternalLink,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const revalidate = 0; // Fresh dynamic data

export default async function AdminDashboardPage() {
  const [
    totalParts,
    totalRequests,
    newRequests,
    quotedRequests,
    fulfilledRequests,
    recentRequests,
    lowStockParts,
  ] = await Promise.all([
    prisma.part.count(),
    prisma.inquiryRequest.count(),
    prisma.inquiryRequest.count({ where: { status: "new" } }),
    prisma.inquiryRequest.count({ where: { status: "quoted" } }),
    prisma.inquiryRequest.count({ where: { status: "fulfilled" } }),
    prisma.inquiryRequest.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
    }),
    prisma.part.findMany({
      where: { stockCount: { lte: 5 } },
      take: 4,
    }),
  ]);

  const stats = {
    totalParts,
    totalRequests,
    newRequests,
    quotedRequests,
    fulfilledRequests,
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Export Operation Overview
          </h1>
          <p className="text-xs text-zinc-400">
            Real-time Hyundai/Kia parts requests, quotes, and Seoul-Baku logistics status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/parts/new">
            <Button variant="gold" size="sm" className="text-xs font-bold">
              <PlusCircle className="w-4 h-4 mr-1.5" />
              Add OEM Part
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <StatsCards stats={stats} />

      {/* Grid: Low Stock Alert + Quick Logistics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Low Stock Alerts */}
        <div className="rounded-3xl glass-panel p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Low Stock Baku Warehouse
            </h3>
            <Link
              href="/admin/parts"
              className="text-[11px] text-amber-400 hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="space-y-2">
            {lowStockParts.length === 0 ? (
              <p className="text-xs text-zinc-500">All parts well stocked.</p>
            ) : (
              lowStockParts.map((part) => (
                <div
                  key={part.id}
                  className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-mono font-bold text-amber-400">
                      {part.partNumber}
                    </div>
                    <div className="text-[11px] text-zinc-400 truncate max-w-[170px]">
                      {part.brand} • {part.compatibleModels}
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-mono text-xs border border-red-500/30">
                    {part.stockCount} left
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Logistics Corridors Status */}
        <div className="lg:col-span-2 rounded-3xl glass-panel p-6 border border-white/10 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Active Supply Pipeline (Korea → Azerbaijan)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
              <div className="text-[10px] text-zinc-400 uppercase font-bold">
                Seoul Warehouse
              </div>
              <div className="text-xl font-black text-white">4-7 Days</div>
              <div className="text-[10px] text-emerald-400">
                Direct Mobis Factory
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
              <div className="text-[10px] text-zinc-400 uppercase font-bold">
                Baku Hub (Babek)
              </div>
              <div className="text-xl font-black text-white">24h Ready</div>
              <div className="text-[10px] text-sky-400">Local Distribution</div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
              <div className="text-[10px] text-zinc-400 uppercase font-bold">
                Quote Response Time
              </div>
              <div className="text-xl font-black text-amber-400">&lt; 15 mins</div>
              <div className="text-[10px] text-amber-300">WhatsApp / Portal</div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Requests Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-white">
              Recent Customer Inquiries & VIN Requests
            </h2>
            <p className="text-xs text-zinc-400">
              Update pricing, assign statuses, and launch direct WhatsApp conversations.
            </p>
          </div>
          <Link
            href="/admin/requests"
            className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>Full CRM Pipeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <RequestsTable
          initialRequests={
            recentRequests.map((r) => ({
              ...r,
              createdAt: r.createdAt.toISOString(),
            })) as unknown as InquiryItem[]
          }
        />
      </div>
    </div>
  );
}
