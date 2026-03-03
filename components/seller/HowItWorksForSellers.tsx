import { Search, Send, Trophy, Banknote, type LucideIcon } from "lucide-react";

type Step = { icon: LucideIcon; title: string; description: string };

const steps: Step[] = [
  {
    icon: Search,
    title: "Find Active Pools",
    description: "Browse pools that have reached their buyer target and are actively seeking seller bids.",
  },
  {
    icon: Send,
    title: "Submit Your Best Bid",
    description: "Offer your lowest bulk price for the product. Compete with other sellers for one week.",
  },
  {
    icon: Trophy,
    title: "Win the Deal",
    description: "The pool creator selects the best offer. You fulfill the order to all pool participants.",
  },
  {
    icon: Banknote,
    title: "Get Paid On-chain",
    description: "Funds are released from the smart contract directly to your wallet upon delivery confirmation.",
  },
];

export default function HowItWorksForSellers() {
  return (
    <section className="border-t border-b border-white/[0.06] bg-dark py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="text-xs font-bold text-brand uppercase tracking-widest mb-3">For Sellers</p>
          <h2 className="text-2xl font-bold text-lgray">How Selling on Sway Works</h2>
          <p className="text-white/40 font-semibold text-sm mt-2 max-w-sm mx-auto">
            No risk, no upfront costs — guaranteed bulk orders waiting for your best price.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative bg-surface border border-white/[0.07] rounded-2xl p-6">
                <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-brand flex items-center justify-center text-[11px] font-bold text-white">
                  {i + 1}
                </div>
                <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-brand" />
                </div>
                <h3 className="text-sm font-bold text-lgray mb-2">{step.title}</h3>
                <p className="text-xs font-semibold text-white/40 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
