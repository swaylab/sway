import Image from "next/image";
import { ArrowRight, ShieldCheck, Users, TrendingDown } from "lucide-react";
import { stats } from "@/lib/mock-data";

export default function HeroSection() {
  return (
    <section className="bg-dark border-b border-white/[0.06]">
      {/* Top banner */}
      <div className="border-b border-white/[0.06] bg-brand/10">
        <div className="mx-auto max-w-7xl px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/Avalanche_AvaxToken.png" alt="Avalanche" width={18} height={18} className="rounded-full" />
            <p className="text-xs font-semibold text-brand">
              All funds secured by audited smart contracts on Avalanche
            </p>
          </div>
          <p className="hidden sm:block text-xs font-semibold text-white/30">
            Non-custodial · Trustless · Transparent
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="text-xs font-bold text-brand uppercase tracking-wider">
                Web3-Powered Group Buying
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-lgray leading-[1.08] tracking-tight mb-6">
              Pool your demand.
              <br />
              <span className="text-brand">Pay less.</span>
            </h1>

            <p className="text-white/50 text-base font-semibold leading-relaxed mb-10 max-w-md">
              Alone you pay retail. Together you pay wholesale.
              Sway pools buyers, invites sellers to compete, and locks every transaction on-chain.
            </p>

            <div className="flex items-center gap-3 mb-12">
              <button className="flex items-center gap-2 px-6 py-3 bg-brand hover:bg-brand/85 text-white text-sm font-bold rounded-xl transition-colors">
                Browse Active Pools
                <ArrowRight size={15} />
              </button>
              <button className="px-6 py-3 border border-white/10 hover:border-white/20 text-lgray text-sm font-bold rounded-xl transition-colors hover:bg-white/[0.04]">
                Create a Pool
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Users, value: stats.activePools.toLocaleString(), label: "Active Pools" },
                { icon: TrendingDown, value: `$${stats.totalSaved}`, label: "Total Saved", highlight: true },
                { icon: ShieldCheck, value: `${(stats.members / 1000).toFixed(0)}K+`, label: "Members" },
              ].map(({ icon: Icon, value, label, highlight }) => (
                <div key={label} className="bg-surface border border-white/[0.06] rounded-2xl p-4">
                  <Icon size={16} className={`mb-2 ${highlight ? "text-emerald-400" : "text-brand"}`} />
                  <div className={`text-xl font-bold ${highlight ? "text-emerald-400" : "text-lgray"}`}>{value}</div>
                  <div className="text-xs font-semibold text-white/40 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="absolute -inset-4 bg-brand/5 rounded-3xl blur-2xl" />
            <div className="relative bg-surface border border-white/[0.07] rounded-2xl overflow-hidden">
              <div className="bg-surface-2 px-6 py-4 flex items-center justify-between border-b border-white/[0.06]">
                <span className="text-sm font-bold text-lgray">Live Example</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full">
                  Save $250
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">Product</p>
                    <p className="text-base font-bold text-lgray">iPhone 16 Pro Max</p>
                    <p className="text-xs text-white/30 font-semibold mt-0.5">256GB · Natural Titanium</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-surface-2 border border-white/[0.06] flex items-center justify-center text-2xl">
                    📱
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-surface-2 rounded-xl p-4 border border-white/[0.06]">
                    <p className="text-xs font-bold text-white/40 mb-1">Individual</p>
                    <p className="text-2xl font-bold text-white/40 line-through">$1,199</p>
                  </div>
                  <div className="bg-brand/10 rounded-xl p-4 border border-brand/25">
                    <p className="text-xs font-bold text-brand mb-1">Pool Price</p>
                    <p className="text-2xl font-bold text-lgray">$949</p>
                    <p className="text-xs text-emerald-400 font-bold mt-1">-21% savings</p>
                  </div>
                </div>

                <div className="mb-2 flex items-center justify-between text-xs font-bold">
                  <span className="text-white/40">Pool Progress</span>
                  <span className="text-lgray">67 / 100 buyers</span>
                </div>
                <div className="h-2.5 bg-surface-2 rounded-full overflow-hidden mb-6">
                  <div className="h-full w-[67%] bg-brand rounded-full" />
                </div>

                <button className="w-full py-3 bg-brand hover:bg-brand/85 text-white text-sm font-bold rounded-xl transition-colors">
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
