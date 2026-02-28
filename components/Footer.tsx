import { Layers, ShieldCheck, Twitter, Github, Linkedin } from "lucide-react";

const links = {
  Platform: ["Browse Pools", "Create a Pool", "Sell on Sway", "How It Works"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Smart Contract Audit", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-zinc-950 pt-14 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
                <Layers size={15} className="text-white" />
              </div>
              <span className="text-lg font-bold text-white">sway</span>
            </div>
            <p className="mb-5 text-sm font-medium text-zinc-500 leading-relaxed">
              Collective buying powered by blockchain. Pool demand, unlock pricing power.
            </p>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/8 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-400">
              <ShieldCheck size={12} className="text-emerald-400" />
              Secured on Ethereum
            </div>
            <div className="flex items-center gap-3">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/8 bg-zinc-900 text-zinc-500 transition-all hover:border-white/15 hover:text-white"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
                {section}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm font-medium text-zinc-500 transition-colors hover:text-white"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 sm:flex-row">
          <p className="text-xs font-medium text-zinc-600">© 2025 Sway Labs. All rights reserved.</p>
          <p className="text-xs font-medium text-zinc-600">
            Audited smart contracts · Non-custodial · Trustless
          </p>
        </div>
      </div>
    </footer>
  );
}
