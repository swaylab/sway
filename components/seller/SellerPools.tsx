import Image from "next/image";
import { Users, Clock, DollarSign, ArrowRight } from "lucide-react";
import { pools } from "@/lib/mock-data";

export default function SellerPools() {
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10">
          <p className="text-xs font-bold text-brand uppercase tracking-widest mb-2">Open for Bids</p>
          <h2 className="text-3xl font-bold text-lgray tracking-tight">Pools Seeking Sellers</h2>
          <p className="text-white/40 font-semibold text-sm mt-2">
            These pools have reached their buyer target. Submit a bid to win the deal.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {pools.slice(0, 4).map((pool) => {
            const savings = Math.round(((pool.individualPrice - pool.poolPrice) / pool.individualPrice) * 100);
            return (
              <div
                key={pool.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-5 bg-dark border border-white/[0.06] hover:border-brand/25 rounded-2xl p-5 transition-all"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-surface-2 shrink-0">
                  <Image src={pool.imageUrl} alt={pool.title} fill className="object-cover" sizes="80px" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">{pool.categoryLabel}</p>
                  <h3 className="text-base font-bold text-lgray truncate">{pool.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-xs font-semibold text-white/40">
                    <div className="flex items-center gap-1"><Users size={11} />{pool.currentParticipants} buyers</div>
                    <div className="flex items-center gap-1"><Clock size={11} />{pool.timeLeft} left</div>
                    <div className="flex items-center gap-1">
                      <DollarSign size={11} />
                      Target: ${pool.poolPrice.toLocaleString()} ({savings}% off retail)
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right hidden sm:block">
                    <p className="text-lg font-bold text-lgray">${pool.poolPrice.toLocaleString()}</p>
                    <p className="text-xs font-semibold text-white/40">target price</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-brand hover:bg-brand/85 text-white text-sm font-bold rounded-xl transition-colors">
                    Submit Bid <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
