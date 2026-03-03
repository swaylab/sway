import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import ActivePoolsSection from "@/components/ActivePoolsSection";
import AvaxBanner from "@/components/AvaxBanner";
import HowItWorksSection from "@/components/HowItWorksSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CategorySection />
      <ActivePoolsSection />
      <AvaxBanner />
      <HowItWorksSection />
    </main>
  );
}
