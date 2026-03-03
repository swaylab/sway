import Image from "next/image";
import { TrendingUp, Users, ShieldCheck, ArrowRight } from "lucide-react";

export default function SellerHero() {
  return (
    <section className="border-b border-white/[0.06] bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-brand" />
              <span className="text-xs font-bold text-brand uppercase tracking-wider">For Sellers</span>
            </div>

            <h1 className="text-5xl font-bold text-lgray tracking-tight leading-[1.1] mb-6">
              Sell to
              <br />
              <span className="text-brand">guaranteed buyers.</span>
            </h1>

            <p className="text-white/40 font-semibold text-base leading-relaxed mb-10 max-w-md">
              No cold leads. No unsold inventory. On Sway, pools reach you with committed buyers and locked funds — you just submit your best price and win.
            </p>

            <div className="flex items-center gap-3 mb-12">
              <button className="flex items-center gap-2 px-6 py-3 bg-brand hover:bg-brand/85 text-white text-sm font-bold rounded-xl transition-colors">
                Start Selling <ArrowRight size={15} />
              </button>
              <button className="px-6 py-3 border border-white/10 hover:border-white/20 text-lgray text-sm font-bold rounded-xl transition-colors">
                View Active Pools
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Users, value: "1,240+", label: "Active Pools" },
                { icon: TrendingUp, value: "$2.4M", label: "Funds Locked" },
                { icon: ShieldCheck, value: "100%", label: "On-chain" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="bg-surface-2 border border-white/[0.06] rounded-2xl p-4">
                  <Icon size={16} className="text-brand mb-2" />
                  <p className="text-xl font-bold text-lgray">{value}</p>
                  <p className="text-xs font-semibold text-white/40 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[440px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80&auto=format&fit=crop"
              alt="Seller"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 bg-dark/80 backdrop-blur-md border border-white/[0.08] rounded-xl p-4">
              <p className="text-xs font-bold text-brand uppercase tracking-wider mb-1">Example</p>
              <p className="text-sm font-bold text-lgray">iPhone 16 Pro Max Pool — 67/100 buyers</p>
              <p className="text-xs font-semibold text-white/40 mt-1">Submit a bid now and win 67+ guaranteed orders</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
