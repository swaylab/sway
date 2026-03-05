import { ArrowLeft } from "lucide-react";
import { getPool, getPoolBids, getPools } from "@/lib/queries/pools";
import PoolHero from "@/components/pools/PoolHero";
import PoolBids from "@/components/pools/PoolBids";
import PoolCard from "@/components/PoolCard";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function PoolDetailPage({ params }: Props) {
  const { id } = await params;

  const [pool, bids, allPools] = await Promise.all([
    getPool(id).catch(() => null),
    getPoolBids(id).catch(() => []),
    getPools().catch(() => []),
  ]);

  if (!pool) notFound();

  const related = allPools
    .filter((p) => p.id !== pool.id && p.category_id === pool.category_id)
    .slice(0, 3);

  return (
    <main className="bg-dark min-h-screen">
      <div className="border-b border-white/[0.06] bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center gap-2 text-sm font-semibold">
          <a href="/" className="flex items-center gap-1.5 text-white/40 hover:text-lgray transition-colors">
            <ArrowLeft size={14} />
            Back
          </a>
          <span className="text-white/20">/</span>
          <a href="/#pools" className="text-white/40 hover:text-lgray transition-colors">Pools</a>
          <span className="text-white/20">/</span>
          <span className="text-lgray truncate max-w-xs">{pool.title}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col gap-16">
        <PoolHero pool={pool} />

        {bids.length > 0 && (
          <div className="border-t border-white/[0.06] pt-12">
            <PoolBids bids={bids} />
          </div>
        )}

        {related.length > 0 && (
          <div className="border-t border-white/[0.06] pt-12">
            <p className="text-xs font-bold text-brand uppercase tracking-widest mb-2">More Like This</p>
            <h2 className="text-2xl font-bold text-lgray mb-8">Related Pools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <PoolCard key={p.id} pool={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
