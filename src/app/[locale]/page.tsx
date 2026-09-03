import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/home/HeroSection";
import BrandSelector from "@/components/home/BrandSelector";
import SupplyChainBanner from "@/components/home/SupplyChainBanner";
import FeaturedParts from "@/components/home/FeaturedParts";
import ProcessSection from "@/components/home/ProcessSection";
import { type PartItem } from "@/components/catalog/PartCard";

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  let featuredParts: PartItem[] = [];

  try {
    const dbParts = await prisma.part.findMany({
      where: { featured: true },
      take: 6,
      orderBy: { createdAt: "desc" },
    });

    if (dbParts.length === 0) {
      // fallback to all parts if no featured flagged
      const fallbackParts = await prisma.part.findMany({
        take: 6,
        orderBy: { createdAt: "desc" },
      });
      featuredParts = fallbackParts as unknown as PartItem[];
    } else {
      featuredParts = dbParts as unknown as PartItem[];
    }
  } catch (err) {
    console.error("Failed to load featured parts from database:", err);
  }

  return (
    <div className="space-y-4">
      <HeroSection />
      <BrandSelector />
      <FeaturedParts parts={featuredParts} />
      <SupplyChainBanner />
      <ProcessSection />
    </div>
  );
}
