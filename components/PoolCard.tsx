import Image from "next/image";
import { Clock, Users, TrendingDown, Flame, Sparkles, AlertCircle } from "lucide-react";

type Pool = {
  id: string;
  title: string;
  categoryLabel: string;
  imageUrl: string;
  individualPrice: number;
  poolPrice: number;
  currentParticipants: number;
  targetParticipants: number;
  timeLeft: string;
  status: string;
};

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
};

export default function PoolCard({ pool }: Props) {
  const progress = Math.round((pool.currentParticipants / pool.targetParticipants) * 100);
  const savings = Math.round(((pool.individualPrice - pool.poolPrice) / pool.individualPrice) * 100);
  const status = statusMap[pool.status];

  return (
    <div className="group relative flex flex-col rounded-2xl border border-white/[0.07] bg-surface overflow-hidden hover:border-brand/30 hover:shadow-xl hover:shadow-brand/10 transition-all duration-200">
      <a href={`/pools/${pool.id}`} className="absolute inset-0 z-10" aria-label={pool.title} />

      {/* Image */}
      <div className="relative h-52 bg-surface-2 overflow-hidden">
        <Image
          src={pool.imageUrl}
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

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1">
            {pool.categoryLabel}
          </p>
          <h3 className="text-[15px] font-bold text-lgray leading-snug">{pool.title}</h3>
        </div>

        {/* Pricing */}
        <div className="flex items-end justify-between bg-surface-2 rounded-xl p-3 border border-white/[0.05]">
          <div>
            <p className="text-xs font-semibold text-white/30 line-through">
              ${pool.individualPrice.toLocaleString()} retail
            </p>
            <p className="text-2xl font-bold text-lgray tracking-tight">
              ${pool.poolPrice.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1.5 rounded-lg">
            <TrendingDown size={13} className="text-emerald-400" />
            <span className="text-sm font-bold text-emerald-400">-{savings}%</span>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-white/40">
              <Users size={12} />
              <span>
                <span className="text-lgray font-bold">{pool.currentParticipants}</span>
                {" "}/{" "}{pool.targetParticipants} joined
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-white/30">
              <Clock size={11} />
              {pool.timeLeft}
            </div>
          </div>
          <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
            <div className="h-full bg-brand rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-[11px] font-semibold text-white/25 mt-1.5">{progress}% filled</p>
        </div>

        <button className="relative z-20 mt-auto w-full py-2.5 bg-brand hover:bg-brand/85 text-white text-sm font-bold rounded-xl transition-colors">
          Join Pool
        </button>
      </div>
    </div>
  );
}
