import Image from "next/image";
import { Clock, Users, TrendingDown, Flame, Sparkles, AlertCircle } from "lucide-react";

type Props = { pool: Pool };

const statusMap: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
  hot: {
    label: "Hot",
    icon: <Flame size={11} className="fill-orange-400 text-orange-400" />,
    cls: "bg-orange-400/15 text-orange-300 border-orange-400/20",
  },
  "ending-soon": {
    label: "Ending Soon",
    icon: <AlertCircle size={11} />,
    cls: "bg-brand/15 text-brand border-brand/20",
  },
  new: {
    label: "New",
    icon: <Sparkles size={11} />,
    cls: "bg-white/10 text-white/70 border-white/15",
  },
  open: {
    label: "Open",
    icon: <Sparkles size={11} />,
    cls: "bg-white/10 text-white/70 border-white/15",
  },
  bidding: {
    label: "Bidding",
    icon: <Flame size={11} className="fill-orange-400 text-orange-400" />,
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

export default function PoolCard({ pool }: Props) {
  const progress = Math.round((pool.current_participants / pool.min_participants) * 100);
  const savings = Math.round(((pool.individual_price - pool.target_price) / pool.individual_price) * 100);
  const status = statusMap[pool.status] ?? statusMap["open"];
  const timeLeft = getTimeLeft(pool.expires_at);
  const categoryLabel = pool.categories?.label ?? pool.category_id ?? "";

  return (
    <div className="group relative flex flex-col rounded-2xl border border-white/[0.07] bg-surface overflow-hidden hover:border-brand/30 hover:shadow-xl hover:shadow-brand/10 transition-all duration-200">
      <a href={`/pools/${pool.id}`} className="absolute inset-0 z-10" aria-label={pool.title} />

      <div className="relative h-52 bg-surface-2 overflow-hidden">
        <Image
          src={pool.image_url ?? "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop"}
          alt={pool.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent" />
        <div className={`absolute top-3 left-3 flex items-center gap-1.5 border rounded-lg px-2.5 py-1 text-[11px] font-bold backdrop-blur-sm ${status.cls}`}>
          {status.icon}
          {status.label}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1">{categoryLabel}</p>
          <h3 className="text-[15px] font-bold text-lgray leading-snug">{pool.title}</h3>
        </div>

        <div className="flex items-end justify-between bg-surface-2 rounded-xl p-3 border border-white/[0.05]">
          <div>
            <p className="text-xs font-semibold text-white/30 line-through">${pool.individual_price.toLocaleString()} retail</p>
            <p className="text-2xl font-bold text-lgray tracking-tight">${pool.target_price.toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-1 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1.5 rounded-lg">
            <TrendingDown size={13} className="text-emerald-400" />
            <span className="text-sm font-bold text-emerald-400">-{savings}%</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-white/40">
              <Users size={12} />
              <span>
                <span className="text-lgray font-bold">{pool.current_participants}</span>
                {" "}/{" "}{pool.min_participants} joined
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-white/30">
              <Clock size={11} />
              {timeLeft}
            </div>
          </div>
          <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
            <div className="h-full bg-brand rounded-full transition-all" style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
          <p className="text-[11px] font-semibold text-white/25 mt-1.5">{Math.min(progress, 100)}% filled</p>
        </div>

        <button className="relative z-20 mt-auto w-full py-2.5 bg-brand hover:bg-brand/85 text-white text-sm font-bold rounded-xl transition-colors">
          Join Pool
        </button>
      </div>
    </div>
  );
}
