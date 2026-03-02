import { Layers } from "lucide-react";
import CreatePoolForm from "@/components/create/CreatePoolForm";

export default function CreatePoolPage() {
  return (
    <main className="bg-slate-950 min-h-screen">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <Layers size={16} className="text-blue-400" />
            </div>
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">New Pool</p>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Create a Pool</h1>
          <p className="text-slate-400 font-semibold text-sm max-w-md leading-relaxed">
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
