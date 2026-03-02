import { ArrowLeft } from "lucide-react";
import { pools, bids } from "@/lib/mock-data";
import PoolHero from "@/components/pools/PoolHero";
import PoolBids from "@/components/pools/PoolBids";
import PoolCard from "@/components/PoolCard";

type Props = { params: Promise<{ id: string }> };

export default async function PoolDetailPage({ params }: Props) {
  const { id } = await params;
  const pool = pools.find((p) => p.id === id) ?? pools[0];
  const poolBids = bids.filter((b) => b.poolId === pool.id);
  const related = pools.filter((p) => p.id !== pool.id && p.category === pool.category).slice(0, 3);

  return (
    <main className="bg-slate-950 min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center gap-2 text-sm font-semibold">
          <a href="/" className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={14} />
            Back
          </a>
          <span className="text-slate-700">/</span>
          <a href="/#pools" className="text-slate-400 hover:text-white transition-colors">Pools</a>
          <span className="text-slate-700">/</span>
          <span className="text-slate-300 truncate max-w-xs">{pool.title}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col gap-16">
        <PoolHero pool={pool} />

        {poolBids.length > 0 && (
          <div className="border-t border-slate-800 pt-12">
            <PoolBids bids={poolBids} />
          </div>
        )}

        {related.length > 0 && (
          <div className="border-t border-slate-800 pt-12">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">More Like This</p>
            <h2 className="text-2xl font-bold text-white mb-8">Related Pools</h2>
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
