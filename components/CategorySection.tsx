import {
  Flame, Smartphone, Gamepad2, ShoppingBag,
  Home, Sparkles, Dumbbell, BookOpen, type LucideIcon,
} from "lucide-react";
import { categories } from "@/lib/mock-data";

const iconMap: Record<string, LucideIcon> = {
  all: Flame,
  electronics: Smartphone,
  gaming: Gamepad2,
  fashion: ShoppingBag,
  home: Home,
  beauty: Sparkles,
  sports: Dumbbell,
  books: BookOpen,
};

export default function CategorySection() {
  return (
    <section id="categories" className="bg-surface border-b border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.id];
            const active = i === 0;
            return (
              <button
                key={cat.id}
                className={`flex shrink-0 items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  active
                    ? "bg-brand text-white"
                    : "text-white/50 hover:bg-white/[0.05] hover:text-lgray"
                }`}
              >
                {Icon && <Icon size={14} />}
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
