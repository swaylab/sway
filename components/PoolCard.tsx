import Image from "next/image";
import { Clock, Users, Flame, Sparkles, AlertCircle, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Pool = {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  imageUrl: string;
  individualPrice: number;
  poolPrice: number;
  currentParticipants: number;
  targetParticipants: number;
  timeLeft: string;
  status: string;
};

type Props = {
  pool: Pool;
};

const statusConfig: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
  hot: {
    label: "Hot",
    className: "border-orange-500/30 bg-orange-500/10 text-orange-400",
    icon: <Flame size={11} />,
  },
  "ending-soon": {
    label: "Ending Soon",
    className: "border-red-500/30 bg-red-500/10 text-red-400",
    icon: <AlertCircle size={11} />,
  },
  new: {
    label: "New",
    className: "border-violet-500/30 bg-violet-500/10 text-violet-400",
    icon: <Sparkles size={11} />,
  },
};

export default function PoolCard({ pool }: Props) {
  const progress = Math.round((pool.currentParticipants / pool.targetParticipants) * 100);
  const savings = Math.round(((pool.individualPrice - pool.poolPrice) / pool.individualPrice) * 100);
  const status = statusConfig[pool.status];

  return (
    <Card className="group flex flex-col gap-0 overflow-hidden border-white/8 bg-zinc-900 p-0 transition-all duration-200 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-950/50">
      <div className="relative h-44 w-full overflow-hidden bg-zinc-800">
        <Image
          src={pool.imageUrl}
          alt={pool.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent" />
        <Badge
          className={`absolute right-3 top-3 flex items-center gap-1 border text-[11px] font-semibold ${status.className}`}
          variant="outline"
        >
          {status.icon}
          {status.label}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
            {pool.categoryLabel}
          </p>
          <h3 className="mt-1 text-sm font-bold text-white leading-snug">{pool.title}</h3>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-medium text-zinc-600 line-through">
              ${pool.individualPrice.toLocaleString()}
            </p>
            <p className="text-2xl font-bold tracking-tight text-white">
              ${pool.poolPrice.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-emerald-500/12 px-2.5 py-1.5">
            <TrendingDown size={13} className="text-emerald-400" />
            <span className="text-sm font-bold text-emerald-400">-{savings}%</span>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-400">
              <Users size={12} />
              <span>
                <span className="font-bold text-white">{pool.currentParticipants}</span>
                <span className="text-zinc-500"> / {pool.targetParticipants} joined</span>
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-zinc-500">
              <Clock size={11} />
              <span>{pool.timeLeft}</span>
            </div>
          </div>
          <Progress value={progress} className="h-1.5 bg-zinc-800" />
        </div>

        <Button className="w-full bg-violet-600 text-sm font-semibold text-white hover:bg-violet-500">
          Join Pool
        </Button>
      </div>
    </Card>
  );
}
