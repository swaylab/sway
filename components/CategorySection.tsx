import {
  Flame,
  Smartphone,
  Gamepad2,
  ShoppingBag,
  Home,
  Sparkles,
  Dumbbell,
  BookOpen,
  type LucideIcon,
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
    <section id="categories" className="border-b border-white/8 bg-zinc-950 py-5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {categories.map((cat) => {
            const Icon = iconMap[cat.id];
            return (
              <button
                key={cat.id}
                className="flex shrink-0 items-center gap-2 rounded-lg border border-white/8 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-400 transition-all hover:border-violet-500/40 hover:bg-violet-500/8 hover:text-white"
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
