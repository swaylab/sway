import Image from "next/image";
import { Twitter, Github, Linkedin } from "lucide-react";

const links: Record<string, string[]> = {
  Platform: ["Browse Pools", "Create a Pool", "Sell on Sway", "How It Works"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Smart Contract Audit", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/[0.06] pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">

          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <Image src="/logo.jpg" alt="Sway" width={32} height={32} className="rounded-lg" />
              <span className="text-lg font-bold text-lgray tracking-tight">sway</span>
            </div>
            <p className="text-sm font-semibold text-white/40 leading-relaxed mb-5">
              Collective buying powered by blockchain. Pool demand, unlock pricing power, pay less.
            </p>
            <div className="mb-5">
              <Image
                src="/PoweredbyAvalanche_RedWhite 1.png"
                alt="Powered by Avalanche"
                width={180}
                height={48}
                className="object-contain rounded-lg"
              />
            </div>
            <div className="flex items-center gap-2">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl border border-white/[0.06] bg-surface hover:border-white/10 hover:bg-surface-2 flex items-center justify-center text-white/30 hover:text-lgray transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-[11px] font-bold text-white/40 uppercase tracking-[2px] mb-5">
                {section}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm font-semibold text-white/40 hover:text-lgray transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/[0.06] pt-6">
          <p className="text-xs font-semibold text-white/25">© 2025 Sway Labs. All rights reserved.</p>
          <p className="text-xs font-semibold text-white/25">Audited · Non-custodial · Trustless</p>
        </div>
      </div>
    </footer>
  );
}
