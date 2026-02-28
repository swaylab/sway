import { SlidersHorizontal } from "lucide-react";
import { pools } from "@/lib/mock-data";
import PoolCard from "@/components/PoolCard";

const filters = ["All", "Hot", "Ending Soon", "New"];

export default function ActivePoolsSection() {
  return (
    <section id="pools" className="bg-zinc-950 py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-violet-400">
              Live Now
            </p>
            <h2 className="text-2xl font-bold text-white">Active Pools</h2>
            <p className="mt-1 text-sm font-medium text-zinc-500">
              Join a pool to unlock collective pricing power
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg border border-white/8 bg-zinc-900 p-1">
              {filters.map((filter, i) => (
                <button
                  key={filter}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                    i === 0
                      ? "bg-violet-600 text-white"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1.5 rounded-lg border border-white/8 bg-zinc-900 px-3 py-2 text-xs font-semibold text-zinc-400 transition-all hover:border-white/15 hover:text-white">
              <SlidersHorizontal size={13} />
              Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pools.map((pool) => (
            <PoolCard key={pool.id} pool={pool} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <button className="rounded-xl border border-white/8 bg-zinc-900 px-7 py-2.5 text-sm font-semibold text-zinc-400 transition-all hover:border-violet-500/30 hover:text-white">
            View all pools
          </button>
        </div>
      </div>
    </section>
  );
}
