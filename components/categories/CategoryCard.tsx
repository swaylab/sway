import Image from "next/image";
import { ArrowRight } from "lucide-react";

type Category = {
  id: string;
  label: string;
  description: string;
  imageUrl: string;
  activePools: number;
  totalSaved: string;
};

type Props = { category: Category };

export default function CategoryCard({ category }: Props) {
  return (
    <a
      href={`/categories/${category.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-950/30 transition-all duration-200"
    >
      <div className="relative h-48 overflow-hidden bg-slate-800">
        <Image
          src={category.imageUrl}
          alt={category.label}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="text-2xl font-bold text-white">{category.label}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3">
        <p className="text-sm font-semibold text-slate-400 leading-relaxed">{category.description}</p>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-base font-bold text-white">{category.activePools}</p>
              <p className="text-xs font-semibold text-slate-500">Active Pools</p>
            </div>
            <div>
              <p className="text-base font-bold text-emerald-400">${category.totalSaved}</p>
              <p className="text-xs font-semibold text-slate-500">Total Saved</p>
            </div>
          </div>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </a>
  );
}
