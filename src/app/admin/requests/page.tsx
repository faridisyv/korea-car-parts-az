import { prisma } from "@/lib/prisma";
import RequestsTable, {
  type InquiryItem,
} from "@/components/admin/RequestsTable";
import { MessageSquareQuote, ShieldAlert } from "lucide-react";

export const revalidate = 0;

export default async function AdminRequestsPage() {
  const requests = await prisma.inquiryRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  const formattedRequests: InquiryItem[] = requests.map((r) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
            Inquiry Pipeline
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
          Customer Inquiries & Custom Part Requests
        </h1>
        <p className="text-xs text-zinc-400">
          Manage VIN code requests from Azerbaijani drivers and auto repair shops.
        </p>
      </div>

      <RequestsTable initialRequests={formattedRequests} />
    </div>
  );
}
