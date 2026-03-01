import { Target, Users, CheckCircle2, Tag, Package, type LucideIcon } from "lucide-react";

type Step = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    title: "Create a Pool",
    description: "Pick a product, set the minimum buyer count, and open the pool.",
    icon: Target,
  },
  {
    title: "Buyers Join",
    description: "Others join and lock funds in a smart contract. Zero counterparty risk.",
    icon: Users,
  },
  {
    title: "Target Reached",
    description: "Goal met — sellers are notified and invited to submit their best price.",
    icon: CheckCircle2,
  },
  {
    title: "Sellers Compete",
    description: "Manufacturers and sellers bid against each other for one week.",
    icon: Tag,
  },
  {
    title: "Deal Closed",
    description: "Best offer wins. Products ship, funds released on-chain — done.",
    icon: Package,
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-t border-slate-800 bg-slate-900 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center mb-16">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-[2px] mb-3">The Process</p>
          <h2 className="text-3xl font-bold text-white tracking-tight">How It Works</h2>
          <p className="text-slate-500 font-semibold text-sm mt-3 max-w-sm mx-auto leading-relaxed">
            Five steps from opening a pool to saving money — all on-chain.
          </p>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative flex flex-col items-center text-center">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+2.5rem)] w-[calc(100%-2rem)] h-px border-t border-dashed border-slate-700" />
                )}
                <div className="relative mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                    <Icon size={22} className="text-blue-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs font-semibold text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
