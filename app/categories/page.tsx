import { categoryDetails } from "@/lib/mock-data";
import CategoryCard from "@/components/categories/CategoryCard";

export default function CategoriesPage() {
  const totalPools = categoryDetails.reduce((sum, c) => sum + c.activePools, 0);

  return (
    <main className="bg-dark min-h-screen">
      <div className="border-b border-white/[0.06] bg-surface py-14">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-bold text-brand uppercase tracking-widest mb-3">Browse</p>
          <h1 className="text-4xl font-bold text-lgray tracking-tight mb-4">All Categories</h1>
          <p className="text-white/40 font-semibold text-base max-w-lg leading-relaxed">
            {totalPools.toLocaleString()} active pools across {categoryDetails.length} categories.
            Find your product and join a pool to unlock bulk pricing.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoryDetails.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </main>
  );
}
