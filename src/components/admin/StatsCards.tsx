import {
  Package,
  MessageSquareQuote,
  Clock,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

interface StatsCardsProps {
  stats: {
    totalParts: number;
    totalRequests: number;
    newRequests: number;
    quotedRequests: number;
    fulfilledRequests: number;
  };
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      label: "Total Customer Inquiries",
      value: stats.totalRequests,
      icon: MessageSquareQuote,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    },
    {
      label: "Pending New Inquiries",
      value: stats.newRequests,
      icon: Clock,
      color: "text-amber-400 bg-amber-500/20 border-amber-500/40",
      highlight: true,
    },
    {
      label: "Quoted Inquiries",
      value: stats.quotedRequests,
      icon: TrendingUp,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/30",
    },
    {
      label: "Active Parts in Catalog",
      value: stats.totalParts,
      icon: Package,
      color: "text-sky-400 bg-sky-500/10 border-sky-500/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.label}
            className={`p-5 rounded-2xl glass-panel border transition-all ${
              c.highlight
                ? "border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.15)]"
                : "border-white/10"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400">
                {c.label}
              </span>
              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center ${c.color}`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-white mt-3">
              {c.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}
