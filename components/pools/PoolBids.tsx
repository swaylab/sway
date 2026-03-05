import { Star, MapPin, Package, ShieldCheck, Trophy } from "lucide-react";

export default function PoolBids({ bids }: { bids: Bid[] }) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-bold text-brand uppercase tracking-widest mb-1">Competing Offers</p>
        <h2 className="text-2xl font-bold text-lgray">Seller Bids</h2>
        <p className="text-sm font-semibold text-white/40 mt-1">{bids.length} verified sellers competing for this pool</p>
      </div>

      <div className="flex flex-col gap-4">
        {bids.map((bid, i) => {
          const seller = bid.sellers;
          const badge = i === 0 ? "Best Price" : i === 1 ? "Top Rated" : null;

          return (
            <div
              key={bid.id}
              className={`relative flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-2xl border p-5 transition-all ${
                i === 0
                  ? "border-brand/30 bg-brand/5"
                  : "border-white/[0.06] bg-surface hover:border-white/10"
              }`}
            >
              {badge && (
                <div className={`absolute -top-3 left-5 flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ${
                  badge === "Best Price" ? "bg-brand text-white" : "bg-amber-500 text-white"
                }`}>
                  <Trophy size={10} />
                  {badge}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-lgray">{seller?.company_name ?? "Seller"}</span>
                  {seller?.verified && <ShieldCheck size={14} className="text-emerald-400" />}
                </div>
                {seller?.location && (
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-white/40">
                    <MapPin size={11} />
                    {seller.location}
                  </div>
                )}
                <div className="flex items-center gap-4 text-xs font-semibold text-white/40">
                  {seller && (
                    <div className="flex items-center gap-1">
                      <Star size={11} className="fill-amber-400 text-amber-400" />
                      <span className="text-lgray">{seller.rating}</span>
                      <span className="text-white/25">({seller.review_count} reviews)</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Package size={11} />
                    {bid.delivery_days}d delivery
                  </div>
                </div>
                {bid.warranty && <p className="text-xs font-semibold text-white/25">{bid.warranty}</p>}
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="text-2xl font-bold text-lgray">${bid.price.toLocaleString()}</p>
                  <p className="text-xs font-semibold text-white/40">per unit</p>
                </div>
                <button className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  i === 0 ? "bg-brand hover:bg-brand/85 text-white" : "border border-white/10 text-white/50 hover:bg-white/[0.05] hover:text-lgray"
                }`}>
                  Select
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
