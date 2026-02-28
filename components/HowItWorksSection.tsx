import { Target, Users, CheckCircle2, Tag, Package } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Step = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Create a Pool",
    description:
      "Select a product, set the minimum participant count, and open a pool for others to join.",
    icon: Target,
  },
  {
    number: "02",
    title: "Others Join",
    description:
      "Buyers deposit funds into a smart contract. Funds are locked safely until the deal closes.",
    icon: Users,
  },
  {
    number: "03",
    title: "Target Reached",
    description:
      "Once the participant goal is hit, sellers are notified and invited to submit their best offer.",
    icon: CheckCircle2,
  },
  {
    number: "04",
    title: "Sellers Bid",
    description:
      "Sellers and manufacturers compete for one week, submitting their lowest bulk price.",
    icon: Tag,
  },
  {
    number: "05",
    title: "Deal Closed",
    description:
      "The best offer wins. Products ship, sellers get paid, and everyone saves — on-chain.",
    icon: Package,
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-t border-white/8 bg-zinc-900/40 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-violet-400">
            The Process
          </p>
          <h2 className="text-2xl font-bold text-white">How It Works</h2>
          <p className="mt-2 text-sm font-medium text-zinc-500">
            From pool creation to doorstep delivery — transparent and trustless.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                {index < steps.length - 1 && (
                  <div className="absolute top-7 left-[calc(50%+2.5rem)] hidden h-px w-[calc(100%-1.5rem)] border-t border-dashed border-white/10 lg:block" />
                )}

                <div className="relative mb-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-zinc-800">
                    <Icon size={22} className="text-violet-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white">
                    {index + 1}
                  </div>
                </div>

                <h3 className="mb-2 text-sm font-bold text-white">{step.title}</h3>
                <p className="text-xs font-medium text-zinc-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
