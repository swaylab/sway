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
  description: string;
};

type Props = { pool: Pool };

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
};

export default function PoolHero({ pool }: Props) {
  const progress = Math.round((pool.currentParticipants / pool.targetParticipants) * 100);
  const savings = Math.round(((pool.individualPrice - pool.poolPrice) / pool.individualPrice) * 100);
  const saved = pool.individualPrice - pool.poolPrice;
  const status = statusMap[pool.status];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <div className="relative h-[420px] rounded-2xl overflow-hidden bg-surface-2">
        <Image src={pool.imageUrl} alt={pool.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
        <div className={`absolute top-4 left-4 flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-xs font-bold backdrop-blur-sm ${status.cls}`}>
          {status.icon}
          {status.label}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs font-bold text-brand uppercase tracking-widest mb-2">{pool.categoryLabel}</p>
          <h1 className="text-3xl font-bold text-lgray tracking-tight mb-3">{pool.title}</h1>
          <p className="text-sm font-semibold text-white/40 leading-relaxed">{pool.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface border border-white/[0.06] rounded-xl p-4">
            <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">Retail Price</p>
            <p className="text-2xl font-bold text-white/30 line-through">${pool.individualPrice.toLocaleString()}</p>
          </div>
          <div className="bg-brand/10 border border-brand/25 rounded-xl p-4">
            <p className="text-xs font-bold text-brand uppercase tracking-wider mb-1">Pool Price</p>
            <p className="text-2xl font-bold text-lgray">${pool.poolPrice.toLocaleString()}</p>
            <p className="text-xs font-bold text-emerald-400 mt-1">Save ${saved} (-{savings}%)</p>
          </div>
        </div>

        <div className="bg-surface border border-white/[0.06] rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-white/40">
              <Users size={14} />
              <span>
                <span className="text-lgray font-bold">{pool.currentParticipants}</span>
                {" / "}{pool.targetParticipants} buyers joined
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-white/30">
              <Clock size={13} />
              {pool.timeLeft} left
            </div>
          </div>
          <div className="h-3 bg-surface-2 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-brand rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs font-bold text-white/25">{progress}% filled — {pool.targetParticipants - pool.currentParticipants} more needed</p>
        </div>

        <div className="flex items-center gap-3 bg-brand/5 border border-brand/15 rounded-xl p-4">
          <Image src="/Avalanche_AvaxToken.png" alt="Avalanche" width={28} height={28} className="shrink-0 rounded-full" />
          <p className="text-xs font-semibold text-white/40 leading-relaxed">
            Funds locked in an audited smart contract on <span className="text-brand font-bold">Avalanche</span>. Released only when the best offer is accepted.
          </p>
        </div>

        <button className="w-full py-4 bg-brand hover:bg-brand/85 text-white text-base font-bold rounded-xl transition-colors">
          Join Pool — ${pool.poolPrice.toLocaleString()} per unit
        </button>
      </div>
    </div>
  );
}
