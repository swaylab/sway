import { getCategories } from "@/lib/queries/categories";
import CreatePoolForm from "@/components/create/CreatePoolForm";

export default async function CreatePoolPage() {
  const categories = await getCategories();

  return (
    <main className="bg-dark min-h-screen">
      <div className="border-b border-white/[0.06] bg-surface py-12">
        <div className="mx-auto max-w-2xl px-6">
          <p className="text-xs font-bold text-brand uppercase tracking-widest mb-3">New Pool</p>
          <h1 className="text-3xl font-bold text-lgray tracking-tight mb-2">Create a Pool</h1>
          <p className="text-white/40 font-semibold text-sm">
            Your wallet deploys the smart contract — you become the pool creator.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-12">
        <CreatePoolForm categories={categories} />
      </div>
    </main>
  );
}
