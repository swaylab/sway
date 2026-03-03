import Image from "next/image";
import { Zap, DollarSign, ShieldCheck, ArrowRight } from "lucide-react";

const metrics = [
  {
    icon: Zap,
    value: "<2s",
    label: "Transaction Finality",
    description: "Near-instant settlement on Avalanche",
  },
  {
    icon: DollarSign,
    value: "$0.01",
    label: "Avg. Gas Fee",
    description: "Fraction of a cent per transaction",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Non-custodial",
    description: "You own your funds at all times",
  },
];

export default function AvaxBanner() {
  return (
    <section className="border-t border-b border-white/[0.06] bg-surface overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — logo + text */}
          <div>
            <div className="mb-8">
              <Image
                src="/AvalancheLogo_Vertical_4C_Primary_KO.png"
                alt="Avalanche"
                width={160}
                height={100}
                className="object-contain"
              />
            </div>

            <h2 className="text-3xl font-bold text-lgray tracking-tight mb-4">
              Built on Avalanche.<br />
              <span className="text-brand">Fast, cheap, secure.</span>
            </h2>

            <p className="text-sm font-semibold text-white/40 leading-relaxed mb-8 max-w-md">
              Sway runs entirely on the Avalanche blockchain. Every pool, every bid, every payment —
              settled on-chain in under two seconds with near-zero fees. No middlemen. No trust required.
            </p>

            <a
              href="https://www.avax.network"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:text-brand/80 transition-colors"
            >
              Learn about Avalanche
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Right — metrics + powered badge */}
          <div className="flex flex-col gap-4">
            {metrics.map(({ icon: Icon, value, label, description }) => (
              <div
                key={label}
                className="flex items-center gap-5 bg-dark border border-white/[0.06] rounded-2xl p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 border border-brand/20">
                  <Icon size={20} className="text-brand" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-0.5">
                    <span className="text-xl font-bold text-lgray">{value}</span>
                    <span className="text-sm font-bold text-lgray">{label}</span>
                  </div>
                  <p className="text-xs font-semibold text-white/40">{description}</p>
                </div>
              </div>
            ))}

            <div className="mt-2">
              <Image
                src="/PoweredbyAvalanche_RedWhite 1.png"
                alt="Powered by Avalanche"
                width={220}
                height={60}
                className="object-contain rounded-xl"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
