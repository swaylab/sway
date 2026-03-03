import { Star, MapPin, Package, ShieldCheck, Trophy } from "lucide-react";

type Bid = {
  id: string;
  seller: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  delivery: string;
  warranty: string;
  verified: boolean;
  badge: string | null;
};

type Props = { bids: Bid[] };

export default function PoolBids({ bids }: Props) {
  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-bold text-brand uppercase tracking-widest mb-1">Competing Offers</p>
        <h2 className="text-2xl font-bold text-lgray">Seller Bids</h2>
        <p className="text-sm font-semibold text-white/40 mt-1">{bids.length} verified sellers competing for this pool</p>
      </div>

      <div className="flex flex-col gap-4">
        {bids.map((bid, i) => (
          <div
            key={bid.id}
            className={`relative flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-2xl border p-5 transition-all ${
              i === 0
                ? "border-brand/30 bg-brand/5"
                : "border-white/[0.06] bg-surface hover:border-white/10"
            }`}
          >
            {bid.badge && (
              <div className={`absolute -top-3 left-5 flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ${
                bid.badge === "Best Price" ? "bg-brand text-white" : "bg-amber-500 text-white"
              }`}>
                <Trophy size={10} />
                {bid.badge}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-lgray">{bid.seller}</span>
                {bid.verified && <ShieldCheck size={14} className="text-emerald-400" />}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-white/40">
                <MapPin size={11} />
                {bid.location}
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold text-white/40">
                <div className="flex items-center gap-1">
                  <Star size={11} className="fill-amber-400 text-amber-400" />
                  <span className="text-lgray">{bid.rating}</span>
                  <span className="text-white/25">({bid.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Package size={11} />
                  {bid.delivery}
                </div>
              </div>
              <p className="text-xs font-semibold text-white/25">{bid.warranty}</p>
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
        ))}
      </div>
    </div>
  );
}
