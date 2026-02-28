import { Wallet, Plus, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <a href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
              <Layers size={15} className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">sway</span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {[
              { label: "Pools", href: "#pools" },
              { label: "Categories", href: "#categories" },
              { label: "How It Works", href: "#how-it-works" },
              { label: "For Sellers", href: "#" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="hidden gap-2 text-sm text-zinc-400 hover:bg-white/5 hover:text-white sm:flex"
          >
            <Plus size={15} />
            Create Pool
          </Button>
          <Button className="gap-2 bg-violet-600 text-sm font-semibold text-white hover:bg-violet-500">
            <Wallet size={15} />
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  );
}
