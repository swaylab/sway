import { ArrowRight, ShieldCheck, TrendingDown, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stats } from "@/lib/mock-data";

const statItems = [
  { label: "Active Pools", value: stats.activePools.toLocaleString(), icon: Users },
  { label: "Total Saved", value: `$${stats.totalSaved}`, icon: TrendingDown },
  { label: "Members", value: `${(stats.members / 1000).toFixed(1)}K`, icon: ShieldCheck },
];

export default function HeroSection() {
  return (
    <section className="border-b border-white/8 bg-zinc-950 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-center">

          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/8 px-3.5 py-1.5 text-xs font-semibold text-violet-300 tracking-wide uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
              Powered by smart contracts
            </div>

            <h1 className="mb-5 text-5xl font-bold leading-[1.15] tracking-tight text-white lg:text-6xl">
              Buy Together,
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Save Together.
              </span>
            </h1>

            <p className="mb-8 max-w-lg text-base font-medium text-zinc-400 leading-relaxed">
              Pool your demand with other buyers, unlock bulk discounts, and pay less — every transaction secured and transparent on-chain.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button className="gap-2 bg-violet-600 px-6 text-sm font-semibold text-white hover:bg-violet-500">
                Browse Pools
                <ArrowRight size={15} />
              </Button>
              <Button
                variant="outline"
                className="border-white/15 bg-transparent px-6 text-sm font-semibold text-white hover:bg-white/8 hover:border-white/25"
              >
                Create a Pool
              </Button>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 lg:w-80">
            <div className="grid grid-cols-3 gap-3">
              {statItems.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/8 bg-zinc-900 p-4 text-center"
                >
                  <Icon size={16} className="mx-auto mb-2 text-zinc-500" />
                  <div className="text-xl font-bold text-white">{value}</div>
                  <div className="mt-0.5 text-[11px] font-medium text-zinc-500">{label}</div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-white/8 bg-zinc-900 p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Savings Example</span>
                <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-bold text-emerald-400">
                  -21%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-medium text-zinc-500">Individual</div>
                  <div className="text-lg font-bold text-zinc-500 line-through">$1,199</div>
                </div>
                <div className="rounded-full border border-white/10 p-2">
                  <ArrowRight size={14} className="text-zinc-500" />
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-medium text-zinc-500">Pool of 100</div>
                  <div className="text-lg font-bold text-white">$949</div>
                </div>
              </div>
              <p className="mt-3 text-[11px] text-zinc-600 leading-relaxed">
                Funds locked in smart contract. Released only when the deal closes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
