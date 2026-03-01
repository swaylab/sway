import { SlidersHorizontal, ArrowRight } from "lucide-react";
import { pools } from "@/lib/mock-data";
import PoolCard from "@/components/PoolCard";

const filters = ["All", "Hot", "Ending Soon", "New"];

export default function ActivePoolsSection() {
  return (
    <section id="pools" className="bg-slate-950 py-16">
      <div className="mx-auto max-w-7xl px-6">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
          <div>
            <p className="text-xs font-bold text-blue-400 uppercase tracking-[2px] mb-2">Live Now</p>
            <h2 className="text-3xl font-bold text-white tracking-tight">Active Pools</h2>
            <p className="text-slate-500 font-semibold text-sm mt-1.5">
              Join a pool to unlock collective pricing power
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 gap-1">
              {filters.map((f, i) => (
                <button
                  key={f}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    i === 0 ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all">
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
          <button className="flex items-center gap-2 border border-slate-800 hover:border-slate-700 bg-slate-900 hover:bg-slate-800 px-8 py-3 rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all">
            View all pools
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}
