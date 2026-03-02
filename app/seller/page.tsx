import SellerHero from "@/components/seller/SellerHero";
import HowItWorksForSellers from "@/components/seller/HowItWorksForSellers";
import SellerPools from "@/components/seller/SellerPools";

export default function SellerPage() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <SellerHero />
      <HowItWorksForSellers />
      <SellerPools />
    </main>
  );
}
