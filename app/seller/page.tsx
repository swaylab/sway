import SellerHero from "@/components/seller/SellerHero";
import HowItWorksForSellers from "@/components/seller/HowItWorksForSellers";
import SellerPools from "@/components/seller/SellerPools";
import { getPools } from "@/lib/queries/pools";

export default async function SellerPage() {
  const pools = await getPools();

  return (
    <main className="bg-dark min-h-screen">
      <SellerHero />
      <HowItWorksForSellers />
      <SellerPools pools={pools} />
    </main>
  );
}
