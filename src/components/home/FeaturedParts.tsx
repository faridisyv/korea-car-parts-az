"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight, Sparkles } from "lucide-react";
import PartCard, { type PartItem } from "../catalog/PartCard";
import { Button } from "@/components/ui/button";

export default function FeaturedParts({ parts }: { parts: PartItem[] }) {
  const t = useTranslations("catalog");

  return (
    <section className="py-16 relative">
      <div className="container max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              High Demand Korean OEM Stock
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Popular Genuine Hyundai & Kia Parts
            </h2>
            <p className="text-sm text-zinc-400">
              Verified Mobis factory parts ready in Baku warehouse or available via Seoul express flight.
            </p>
          </div>

          <Link href="/catalog">
            <Button
              variant="outline"
              className="border-white/20 hover:border-amber-500 text-xs uppercase font-bold tracking-wider"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parts.map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
        </div>
      </div>
    </section>
  );
}
