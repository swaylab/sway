import { Layers, Plus, Wallet } from "lucide-react";

const navItems = [
  { label: "Pools", href: "#pools" },
  { label: "Categories", href: "#categories" },
  { label: "For Sellers", href: "#" },
  { label: "How It Works", href: "#how-it-works" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <div className="flex items-center gap-10">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Layers size={15} className="text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">sway</span>
          </a>

          <nav className="hidden md:flex items-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/60"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors">
            <Plus size={14} />
            Create Pool
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-bold text-white transition-colors">
            <Wallet size={14} />
            Connect Wallet
          </button>
        </div>

      </div>
    </header>
  );
}
