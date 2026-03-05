import Image from "next/image";
import { Clock, Users, TrendingDown, Flame, Sparkles, AlertCircle } from "lucide-react";

const statusMap: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
  hot: {
    label: "Hot",
    icon: <Flame size={12} className="fill-orange-400 text-orange-400" />,
    cls: "bg-orange-400/15 text-orange-300 border-orange-400/20",
  },
  "ending-soon": {
    label: "Ending Soon",
    icon: <AlertCircle size={12} />,
    cls: "bg-brand/15 text-brand border-brand/20",
  },
  new: {
    label: "New",
    icon: <Sparkles size={12} />,
    cls: "bg-white/10 text-white/70 border-white/15",
  },
  open: {
    label: "Open",
    icon: <Sparkles size={12} />,
    cls: "bg-white/10 text-white/70 border-white/15",
  },
  bidding: {
    label: "Bidding",
    icon: <Flame size={12} className="fill-orange-400 text-orange-400" />,
    cls: "bg-orange-400/15 text-orange-300 border-orange-400/20",
  },
};

function getTimeLeft(expiresAt: string): string {
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return "Expired";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (days > 0) return `${days}d ${hours}h`;
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${mins}m`;
}

export default function PoolHero({ pool }: { pool: Pool }) {
  const progress = Math.round((pool.current_participants / pool.min_participants) * 100);
  const savings = Math.round(((pool.individual_price - pool.target_price) / pool.individual_price) * 100);
  const saved = pool.individual_price - pool.target_price;
  const status = statusMap[pool.status] ?? statusMap["open"];
  const timeLeft = getTimeLeft(pool.expires_at);
  const categoryLabel = pool.categories?.label ?? pool.category_id ?? "";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <div className="relative h-[420px] rounded-2xl overflow-hidden bg-surface-2">
        <Image
          src={pool.image_url ?? "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop"}
          alt={pool.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
        <div className={`absolute top-4 left-4 flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-xs font-bold backdrop-blur-sm ${status.cls}`}>
          {status.icon}
          {status.label}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs font-bold text-brand uppercase tracking-widest mb-2">{categoryLabel}</p>
          <h1 className="text-3xl font-bold text-lgray tracking-tight mb-3">{pool.title}</h1>
          <p className="text-sm font-semibold text-white/40 leading-relaxed">{pool.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface border border-white/[0.06] rounded-xl p-4">
            <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">Retail Price</p>
            <p className="text-2xl font-bold text-white/30 line-through">${pool.individual_price.toLocaleString()}</p>
          </div>
          <div className="bg-brand/10 border border-brand/25 rounded-xl p-4">
            <p className="text-xs font-bold text-brand uppercase tracking-wider mb-1">Pool Price</p>
            <p className="text-2xl font-bold text-lgray">${pool.target_price.toLocaleString()}</p>
            <p className="text-xs font-bold text-emerald-400 mt-1">Save ${saved} (-{savings}%)</p>
          </div>
        </div>

        <div className="bg-surface border border-white/[0.06] rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-white/40">
              <Users size={14} />
              <span>
                <span className="text-lgray font-bold">{pool.current_participants}</span>
                {" / "}{pool.min_participants} buyers joined
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-white/30">
              <Clock size={13} />
              {timeLeft} left
            </div>
          </div>
          <div className="h-3 bg-surface-2 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-brand rounded-full" style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
          <p className="text-xs font-bold text-white/25">{Math.min(progress, 100)}% filled — {pool.min_participants - pool.current_participants} more needed</p>
        </div>

        <div className="flex items-center gap-3 bg-brand/5 border border-brand/15 rounded-xl p-4">
          <Image src="/Avalanche_AvaxToken.png" alt="Avalanche" width={28} height={28} className="shrink-0 rounded-full" />
          <p className="text-xs font-semibold text-white/40 leading-relaxed">
            Funds locked in an audited smart contract on <span className="text-brand font-bold">Avalanche</span>. Released only when the best offer is accepted.
          </p>
        </div>

        <button className="w-full py-4 bg-brand hover:bg-brand/85 text-white text-base font-bold rounded-xl transition-colors">
          Join Pool — ${pool.target_price.toLocaleString()} per unit
        </button>
      </div>
    </div>
  );
}
