import Image from "next/image";
import { Plus, Wallet } from "lucide-react";

const navItems = [
  { label: "Pools", href: "/#pools" },
  { label: "Categories", href: "/categories" },
  { label: "For Sellers", href: "/seller" },
  { label: "How It Works", href: "/#how-it-works" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-dark/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <div className="flex items-center gap-10">
          <a href="/" className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="Sway"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-lg font-bold text-lgray tracking-tight">sway</span>
          </a>

          <nav className="hidden md:flex items-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm font-semibold text-white/50 hover:text-lgray transition-colors rounded-lg hover:bg-white/[0.05]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/create"
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white/50 hover:text-lgray rounded-lg hover:bg-white/[0.05] transition-colors"
          >
            <Plus size={14} />
            Create Pool
          </a>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand hover:bg-brand/85 text-sm font-bold text-white transition-colors">
            <Wallet size={14} />
            Connect Wallet
          </button>
        </div>

      </div>
    </header>
  );
}
