import { Layers } from "lucide-react";
import CreatePoolForm from "@/components/create/CreatePoolForm";

export default function CreatePoolPage() {
  return (
    <main className="bg-dark min-h-screen">
      <div className="border-b border-white/[0.06] bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-brand/15 border border-brand/25 flex items-center justify-center">
              <Layers size={16} className="text-brand" />
            </div>
            <p className="text-xs font-bold text-brand uppercase tracking-widest">New Pool</p>
          </div>
          <h1 className="text-3xl font-bold text-lgray tracking-tight mb-2">Create a Pool</h1>
          <p className="text-white/40 font-semibold text-sm max-w-md leading-relaxed">
            Select a product, set your target buyers and price — then let sellers compete to win your pool.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-14">
        <CreatePoolForm />
      </div>
    </main>
  );
}
