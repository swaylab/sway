import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import ActivePoolsSection from "@/components/ActivePoolsSection";
import AvaxBanner from "@/components/AvaxBanner";
import HowItWorksSection from "@/components/HowItWorksSection";
import { getPools, getStats } from "@/lib/queries/pools";
import { getCategories } from "@/lib/queries/categories";

export default async function Home() {
  const [pools, categories, stats] = await Promise.all([
    getPools(),
    getCategories(),
    getStats(),
  ]);

  return (
    <main>
      <HeroSection stats={stats} />
      <CategorySection categories={categories} />
      <ActivePoolsSection pools={pools} />
      <AvaxBanner />
      <HowItWorksSection />
    </main>
  );
}
