import { SlidersHorizontal, ArrowRight } from "lucide-react";
import PoolCard from "@/components/PoolCard";

const filters = ["All", "Hot", "Ending Soon", "New"];

export default function ActivePoolsSection({ pools }: { pools: Pool[] }) {
  return (
    <section id="pools" className="bg-dark py-16">
      <div className="mx-auto max-w-7xl px-6">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
          <div>
            <p className="text-xs font-bold text-brand uppercase tracking-[2px] mb-2">Live Now</p>
            <h2 className="text-3xl font-bold text-lgray tracking-tight">Active Pools</h2>
            <p className="text-white/40 font-semibold text-sm mt-1.5">
              Join a pool to unlock collective pricing power
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center bg-surface border border-white/[0.06] rounded-xl p-1 gap-1">
              {filters.map((f, i) => (
                <button
                  key={f}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    i === 0 ? "bg-brand text-white" : "text-white/40 hover:text-lgray hover:bg-white/[0.05]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1.5 bg-surface border border-white/[0.06] hover:border-white/10 px-3.5 py-2.5 rounded-xl text-xs font-bold text-white/40 hover:text-lgray transition-all">
              <SlidersHorizontal size={13} />
              Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pools.map((pool) => (
            <PoolCard key={pool.id} pool={pool} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a href="/pools" className="flex items-center gap-2 border border-white/[0.06] hover:border-white/10 bg-surface hover:bg-surface-2 px-8 py-3 rounded-xl text-sm font-bold text-white/40 hover:text-lgray transition-all">
            View all pools
            <ArrowRight size={14} />
          </a>
        </div>

      </div>
    </section>
  );
}
