import { getPools } from "@/lib/queries/pools";
import PoolCard from "@/components/PoolCard";

export default async function PoolsPage() {
  const pools = await getPools();

  return (
    <main className="bg-dark min-h-screen">
      <div className="border-b border-white/[0.06] bg-surface py-12">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-bold text-brand uppercase tracking-widest mb-3">Live Now</p>
          <h1 className="text-4xl font-bold text-lgray tracking-tight mb-3">All Pools</h1>
          <p className="text-white/40 font-semibold text-sm">
            {pools.length} active pools — join one to unlock collective pricing power.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pools.map((pool) => (
            <PoolCard key={pool.id} pool={pool} />
          ))}
        </div>
      </div>
    </main>
  );
}
