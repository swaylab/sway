import Image from "next/image";
import { Clock, Users, TrendingDown, ShieldCheck, Flame, Sparkles, AlertCircle } from "lucide-react";

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
    cls: "bg-red-400/15 text-red-300 border-red-400/20",
  },
  new: {
    label: "New",
    icon: <Sparkles size={12} />,
    cls: "bg-blue-400/15 text-blue-300 border-blue-400/20",
  },
};

export default function PoolHero({ pool }: Props) {
  const progress = Math.round((pool.currentParticipants / pool.targetParticipants) * 100);
  const savings = Math.round(((pool.individualPrice - pool.poolPrice) / pool.individualPrice) * 100);
  const saved = pool.individualPrice - pool.poolPrice;
  const status = statusMap[pool.status];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      {/* Image */}
      <div className="relative h-[420px] rounded-2xl overflow-hidden bg-slate-800">
        <Image
          src={pool.imageUrl}
          alt={pool.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
        <div className={`absolute top-4 left-4 flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-xs font-bold backdrop-blur-sm ${status.cls}`}>
          {status.icon}
          {status.label}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">{pool.categoryLabel}</p>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-3">{pool.title}</h1>
          <p className="text-sm font-semibold text-slate-400 leading-relaxed">{pool.description}</p>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Retail Price</p>
            <p className="text-2xl font-bold text-slate-500 line-through">${pool.individualPrice.toLocaleString()}</p>
          </div>
          <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-4">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">Pool Price</p>
            <p className="text-2xl font-bold text-white">${pool.poolPrice.toLocaleString()}</p>
            <p className="text-xs font-bold text-emerald-400 mt-1">Save ${saved} (-{savings}%)</p>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-400">
              <Users size={14} />
              <span>
                <span className="text-white font-bold">{pool.currentParticipants}</span>
                {" / "}{pool.targetParticipants} buyers joined
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-500">
              <Clock size={13} />
              {pool.timeLeft} left
            </div>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs font-bold text-slate-500">{progress}% filled — {pool.targetParticipants - pool.currentParticipants} more buyers needed</p>
        </div>

        {/* Security note */}
        <div className="flex items-start gap-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
          <ShieldCheck size={16} className="text-emerald-400 mt-0.5 shrink-0" />
          <p className="text-xs font-semibold text-slate-400 leading-relaxed">
            Your funds are locked in an audited smart contract and only released when the best seller offer is accepted. Non-custodial, trustless.
          </p>
        </div>

        <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white text-base font-bold rounded-xl transition-colors">
          Join Pool — ${pool.poolPrice.toLocaleString()} per unit
        </button>
      </div>
    </div>
  );
}
