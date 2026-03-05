import { getCategories } from "@/lib/queries/categories";
import CategoryCard from "@/components/categories/CategoryCard";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="bg-dark min-h-screen">
      <div className="border-b border-white/[0.06] bg-surface py-14">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-bold text-brand uppercase tracking-widest mb-3">Browse</p>
          <h1 className="text-4xl font-bold text-lgray tracking-tight mb-4">All Categories</h1>
          <p className="text-white/40 font-semibold text-base max-w-lg leading-relaxed">
            {categories.length} categories available. Find your product and join a pool to unlock bulk pricing.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </main>
  );
}
