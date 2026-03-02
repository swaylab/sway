"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Check, Package, Users, Clock, DollarSign } from "lucide-react";

const categoryOptions = [
  "Electronics", "Gaming", "Fashion", "Home & Living", "Beauty", "Sports", "Books",
];

const durationOptions = [
  { label: "3 days", value: "3" },
  { label: "5 days", value: "5" },
  { label: "7 days", value: "7" },
  { label: "14 days", value: "14" },
];

type FormData = {
  productName: string;
  category: string;
  description: string;
  imageUrl: string;
  retailPrice: string;
  targetParticipants: string;
  targetPrice: string;
  duration: string;
};

const defaultForm: FormData = {
  productName: "",
  category: "",
  description: "",
  imageUrl: "",
  retailPrice: "",
  targetParticipants: "",
  targetPrice: "",
  duration: "7",
};

export default function CreatePoolForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(defaultForm);

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const savings =
    form.retailPrice && form.targetPrice
      ? Math.round(((Number(form.retailPrice) - Number(form.targetPrice)) / Number(form.retailPrice)) * 100)
      : 0;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Steps indicator */}
      <div className="flex items-center gap-0 mb-10">
        {[
          { n: 1, label: "Product" },
          { n: 2, label: "Pool Settings" },
          { n: 3, label: "Review" },
        ].map(({ n, label }, i) => (
          <div key={n} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step > n
                    ? "bg-emerald-500 text-white"
                    : step === n
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-500"
                }`}
              >
                {step > n ? <Check size={14} /> : n}
              </div>
              <span className={`text-[11px] font-bold mt-1.5 ${step === n ? "text-white" : "text-slate-500"}`}>
                {label}
              </span>
            </div>
            {i < 2 && (
              <div className={`h-px w-16 sm:w-28 mx-2 mb-4 transition-all ${step > n ? "bg-emerald-500" : "bg-slate-800"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Product */}
      {step === 1 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 flex flex-col gap-5">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Product Details</h2>
            <p className="text-sm font-semibold text-slate-500">What product do you want to pool?</p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Product Name *
              </label>
              <input
                type="text"
                placeholder="e.g. iPhone 16 Pro Max 256GB"
                value={form.productName}
                onChange={(e) => update("productName", e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm font-semibold text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Category *
              </label>
              <select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="" disabled>Select a category</option>
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe the product and why others should join..."
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm font-semibold text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Retail / Market Price ($) *
              </label>
              <input
                type="number"
                placeholder="e.g. 1199"
                value={form.retailPrice}
                onChange={(e) => update("retailPrice", e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm font-semibold text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={!form.productName || !form.category || !form.retailPrice}
            className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white text-sm font-bold rounded-xl transition-colors mt-2"
          >
            Continue
            <ChevronRight size={15} />
          </button>
        </div>
      )}

      {/* Step 2: Pool Settings */}
      {step === 2 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 flex flex-col gap-5">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Pool Settings</h2>
            <p className="text-sm font-semibold text-slate-500">Set your target buyers and price goal.</p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Minimum Buyers *
              </label>
              <input
                type="number"
                placeholder="e.g. 100"

                value={form.targetParticipants}
                onChange={(e) => update("targetParticipants", e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm font-semibold text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <p className="text-xs text-slate-600 font-semibold mt-1.5">Sellers will be invited once this count is reached.</p>

            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Target Pool Price ($) *
              </label>
              <input
                type="number"
                placeholder="e.g. 949"
                value={form.targetPrice}
                onChange={(e) => update("targetPrice", e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm font-semibold text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
              {savings > 0 && (
                <p className="text-xs font-bold text-emerald-400 mt-1.5">
                  That&apos;s {savings}% off retail — ${Number(form.retailPrice) - Number(form.targetPrice)} saved per buyer.
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Pool Duration
              </label>
              <div className="grid grid-cols-4 gap-2">
                {durationOptions.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => update("duration", d.value)}
                    className={`py-2.5 rounded-xl text-sm font-bold transition-all border ${
                      form.duration === d.value
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 px-5 py-3 border border-slate-700 text-slate-400 hover:text-white text-sm font-bold rounded-xl transition-colors"
            >
              <ChevronLeft size={15} />
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!form.targetParticipants || !form.targetPrice}
              className="flex items-center justify-center gap-2 flex-1 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white text-sm font-bold rounded-xl transition-colors"
            >
              Review Pool
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Review Your Pool</h2>
            <p className="text-sm font-semibold text-slate-500">Double-check everything before publishing.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Package, label: "Product", value: form.productName },
              { icon: DollarSign, label: "Retail Price", value: `$${form.retailPrice}` },
              { icon: Users, label: "Min Buyers", value: form.targetParticipants },
              { icon: DollarSign, label: "Pool Price", value: `$${form.targetPrice} (-${savings}%)` },
              { icon: Clock, label: "Duration", value: `${form.duration} days` },
              { icon: Package, label: "Category", value: form.category },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-1">
                  <Icon size={13} className="text-blue-400" />
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{label}</p>
                </div>
                <p className="text-sm font-bold text-white">{value}</p>
              </div>
            ))}
          </div>

          {savings > 0 && (
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
              <p className="text-sm font-bold text-emerald-400">
                Each buyer saves ${Number(form.retailPrice) - Number(form.targetPrice)} ({savings}%) if the pool fills and a seller matches your target price.
              </p>
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-1.5 px-5 py-3 border border-slate-700 text-slate-400 hover:text-white text-sm font-bold rounded-xl transition-colors"
            >
              <ChevronLeft size={15} />
              Back
            </button>
            <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-colors">
              Publish Pool
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
