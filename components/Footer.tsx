import { Layers, ShieldCheck, Twitter, Github, Linkedin } from "lucide-react";

const links: Record<string, string[]> = {
  Platform: ["Browse Pools", "Create a Pool", "Sell on Sway", "How It Works"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Smart Contract Audit", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">

          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Layers size={15} className="text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">sway</span>
            </div>
            <p className="text-sm font-semibold text-slate-500 leading-relaxed mb-5">
              Collective buying powered by blockchain. Pool demand, unlock pricing power, pay less.
            </p>
            <div className="inline-flex items-center gap-2 border border-slate-800 bg-slate-900 rounded-full px-3.5 py-1.5 text-xs font-bold text-slate-400 mb-6">
              <ShieldCheck size={13} className="text-emerald-400" />
              Secured on Ethereum
            </div>
            <div className="flex items-center gap-2">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl border border-slate-800 bg-slate-900 hover:border-slate-700 hover:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-white transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[2px] mb-5">
                {section}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm font-semibold text-slate-500 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800 pt-6">
          <p className="text-xs font-semibold text-slate-600">© 2025 Sway Labs. All rights reserved.</p>
          <p className="text-xs font-semibold text-slate-600">Audited · Non-custodial · Trustless</p>
        </div>
      </div>
    </footer>
  );
}
