import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <a
      href={`/categories/${category.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-surface hover:border-brand/30 hover:shadow-xl hover:shadow-brand/10 transition-all duration-200"
    >
      <div className="relative h-48 overflow-hidden bg-surface-2">
        <Image
          src={category.image_url ?? "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop"}
          alt={category.label}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="text-2xl font-bold text-lgray">{category.label}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3">
        <p className="text-sm font-semibold text-white/40 leading-relaxed">{category.description}</p>
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
          <p className="text-xs font-bold text-white/25 uppercase tracking-wider">Browse pools</p>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand/15 text-brand group-hover:bg-brand group-hover:text-white transition-all">
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </a>
  );
}
