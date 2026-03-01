import { ArrowRight, ShieldCheck, Users, TrendingDown } from "lucide-react";
import { stats } from "@/lib/mock-data";

export default function HeroSection() {
  return (
    <section className="bg-slate-950 border-b border-slate-800">
      {/* Top banner */}
      <div className="border-b border-slate-800 bg-blue-600/10">
        <div className="mx-auto max-w-7xl px-6 py-2.5 flex items-center justify-between">
          <p className="text-xs font-semibold text-blue-300">
            🔒 All funds secured by audited smart contracts on Ethereum
          </p>
          <p className="hidden sm:block text-xs font-semibold text-slate-500">
            Non-custodial · Trustless · Transparent
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                Web3-Powered Group Buying
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6">
              Pool your demand.
              <br />
              <span className="text-blue-400">Pay less.</span>
            </h1>

            <p className="text-slate-400 text-base font-semibold leading-relaxed mb-10 max-w-md">
              Alone you pay retail. Together you pay wholesale.
              Sway pools buyers, invites sellers to compete, and locks every transaction on-chain.
            </p>

            <div className="flex items-center gap-3 mb-12">
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-colors">
                Browse Active Pools
                <ArrowRight size={15} />
              </button>
              <button className="px-6 py-3 border border-slate-700 hover:border-slate-600 text-white text-sm font-bold rounded-xl transition-colors hover:bg-slate-800/60">
                Create a Pool
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Users, value: stats.activePools.toLocaleString(), label: "Active Pools", color: "text-blue-400" },
                { icon: TrendingDown, value: `$${stats.totalSaved}`, label: "Total Saved", color: "text-emerald-400" },
                { icon: ShieldCheck, value: `${(stats.members / 1000).toFixed(0)}K+`, label: "Members", color: "text-blue-400" },
              ].map(({ icon: Icon, value, label, color }) => (
                <div key={label} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                  <Icon size={16} className={`${color} mb-2`} />
                  <div className="text-xl font-bold text-white">{value}</div>
                  <div className="text-xs font-semibold text-slate-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — price comparison card */}
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-600/5 rounded-3xl blur-2xl" />
            <div className="relative bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
              {/* Card header */}
              <div className="bg-slate-800 px-6 py-4 flex items-center justify-between border-b border-slate-700">
                <span className="text-sm font-bold text-slate-300">Live Example</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full">
                  Save $250
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Product</p>
                    <p className="text-base font-bold text-white">iPhone 16 Pro Max</p>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">256GB · Natural Titanium</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl">
                    📱
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                    <p className="text-xs font-bold text-slate-500 mb-1">Individual</p>
                    <p className="text-2xl font-bold text-slate-400 line-through">$1,199</p>
                    <p className="text-xs text-slate-600 font-semibold mt-1">Apple Store price</p>
                  </div>
                  <div className="bg-blue-600/10 rounded-xl p-4 border border-blue-500/30">
                    <p className="text-xs font-bold text-blue-400 mb-1">Pool Price</p>
                    <p className="text-2xl font-bold text-white">$949</p>
                    <p className="text-xs text-emerald-400 font-bold mt-1">-21% savings</p>
                  </div>
                </div>

                <div className="mb-2 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-400">Pool Progress</span>
                  <span className="text-white">67 / 100 buyers</span>
                </div>
                <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden mb-6">
                  <div className="h-full w-[67%] bg-blue-500 rounded-full" />
                </div>

                <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-colors">
                  Join This Pool
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
