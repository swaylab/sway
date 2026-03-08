"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { Loader2, Wallet, CheckCircle, AlertCircle } from "lucide-react";
import { SWAY_POOL_ABI, SWAY_POOL_BYTECODE, ACTIVE_CHAIN } from "@/lib/contracts/SwayPool.abi";
import { supabase } from "@/lib/supabase/client";

type Props = { categories: Category[] };

type Status = "idle" | "connecting" | "switching" | "deploying" | "saving" | "success" | "error";

const PRICE_PER_UNIT = "0.01"; // fixed AVAX

declare global {
  interface Window {
    ethereum?: import("ethers").Eip1193Provider & { on: (event: string, handler: (...args: unknown[]) => void) => void };
  }
}

export default function CreatePoolForm({ categories }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [poolId, setPoolId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category_id: categories[0]?.id ?? "",
    image_url: "",
    individual_price: "",
    target_price: "",
    min_participants: "",
    expires_at: "",
  });

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!window.ethereum) {
      setStatus("error");
      setErrorMsg("No wallet found. Install MetaMask or Core Wallet.");
      return;
    }

    try {
      setStatus("connecting");
      setErrorMsg("");

      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await browserProvider.send("eth_requestAccounts", []);
      const walletAddress: string = accounts[0];

      // Switch to Avalanche
      const network = await browserProvider.getNetwork();
      if (Number(network.chainId) !== ACTIVE_CHAIN.chainId) {
        setStatus("switching");
        try {
          await browserProvider.send("wallet_switchEthereumChain", [
            { chainId: `0x${ACTIVE_CHAIN.chainId.toString(16)}` },
          ]);
        } catch {
          await browserProvider.send("wallet_addEthereumChain", [
            {
              chainId: `0x${ACTIVE_CHAIN.chainId.toString(16)}`,
              chainName: ACTIVE_CHAIN.name,
              rpcUrls: [ACTIVE_CHAIN.rpc],
              nativeCurrency: { name: "AVAX", symbol: "AVAX", decimals: 18 },
            },
          ]);
        }
      }

      // Deploy contract from user's wallet
      setStatus("deploying");
      const signer = await browserProvider.getSigner();
      const factory = new ethers.ContractFactory(SWAY_POOL_ABI, SWAY_POOL_BYTECODE, signer);
      const contract = await factory.deploy(
        ethers.parseEther(PRICE_PER_UNIT),
        parseInt(form.min_participants)
      );
      await contract.waitForDeployment();
      const contractAddress = await contract.getAddress();

      // Save to Supabase
      setStatus("saving");

      await supabase.from("users").upsert(
        { wallet_address: walletAddress },
        { onConflict: "wallet_address" }
      );

      const { data, error } = await supabase
        .from("pools")
        .insert({
          title: form.title,
          description: form.description,
          category_id: form.category_id,
          image_url: form.image_url || null,
          individual_price: parseFloat(form.individual_price),
          target_price: parseFloat(form.target_price),
          min_participants: parseInt(form.min_participants),
          expires_at: new Date(form.expires_at).toISOString(),
          contract_address: contractAddress,
          creator_wallet: walletAddress,
          status: "open",
        })
        .select("id")
        .single();

      if (error) throw error;

      setPoolId(data.id);
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      const e = err as { code?: string; reason?: string; message?: string };
      if (e.code === "ACTION_REJECTED" || e.code === "4001") {
        setErrorMsg("Transaction rejected.");
      } else if (e.reason) {
        setErrorMsg(e.reason);
      } else {
        setErrorMsg(e.message ?? "Something went wrong.");
      }
    }
  }

  if (status === "success" && poolId) {
    return (
      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/25 flex items-center justify-center">
          <CheckCircle size={32} className="text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-lgray mb-2">Pool Created!</h2>
          <p className="text-white/40 font-semibold text-sm">Smart contract deployed on Avalanche.</p>
        </div>
        <a
          href={`/pools/${poolId}`}
          className="px-8 py-3 bg-brand hover:bg-brand/85 text-white font-bold rounded-xl transition-colors"
        >
          View Pool
        </a>
      </div>
    );
  }

  const loading = ["connecting", "switching", "deploying", "saving"].includes(status);

  const statusLabel: Partial<Record<Status, string>> = {
    connecting: "Connecting wallet...",
    switching: "Switching to Avalanche...",
    deploying: "Deploying contract...",
    saving: "Saving pool...",
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      {/* Product Info */}
      <div className="bg-surface border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="text-sm font-bold text-lgray uppercase tracking-wider">Product Info</h2>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-white/40">Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. iPhone 16 Pro Max 256GB"
            className="bg-surface-2 border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-semibold text-lgray placeholder:text-white/20 focus:outline-none focus:border-brand/50"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-white/40">Description</label>
          <textarea
            required
            rows={3}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Brief description of the product..."
            className="bg-surface-2 border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-semibold text-lgray placeholder:text-white/20 focus:outline-none focus:border-brand/50 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-white/40">Category</label>
            <select
              required
              value={form.category_id}
              onChange={(e) => set("category_id", e.target.value)}
              className="bg-surface-2 border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-semibold text-lgray focus:outline-none focus:border-brand/50"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-white/40">Image URL</label>
            <input
              value={form.image_url}
              onChange={(e) => set("image_url", e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="bg-surface-2 border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-semibold text-lgray placeholder:text-white/20 focus:outline-none focus:border-brand/50"
            />
          </div>
        </div>
      </div>

      {/* Pool Settings */}
      <div className="bg-surface border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="text-sm font-bold text-lgray uppercase tracking-wider">Pool Settings</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-white/40">Retail Price ($)</label>
            <input
              required
              type="number"
              min="1"
              value={form.individual_price}
              onChange={(e) => set("individual_price", e.target.value)}
              placeholder="1299"
              className="bg-surface-2 border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-semibold text-lgray placeholder:text-white/20 focus:outline-none focus:border-brand/50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-white/40">Pool Target Price ($)</label>
            <input
              required
              type="number"
              min="1"
              value={form.target_price}
              onChange={(e) => set("target_price", e.target.value)}
              placeholder="999"
              className="bg-surface-2 border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-semibold text-lgray placeholder:text-white/20 focus:outline-none focus:border-brand/50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-white/40">Min Participants</label>
            <input
              required
              type="number"
              min="2"
              value={form.min_participants}
              onChange={(e) => set("min_participants", e.target.value)}
              placeholder="50"
              className="bg-surface-2 border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-semibold text-lgray placeholder:text-white/20 focus:outline-none focus:border-brand/50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-white/40">Expiry Date</label>
            <input
              required
              type="date"
              value={form.expires_at}
              onChange={(e) => set("expires_at", e.target.value)}
              className="bg-surface-2 border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-semibold text-lgray focus:outline-none focus:border-brand/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 bg-brand/5 border border-brand/15 rounded-xl p-4 mt-2">
          <AlertCircle size={14} className="text-brand shrink-0" />
          <p className="text-xs font-semibold text-white/40">
            Each participant deposits <span className="text-brand font-bold">0.01 AVAX</span> into the smart contract. Funds are released only when you select a seller.
          </p>
        </div>
      </div>

      {status === "error" && errorMsg && (
        <div className="flex items-center gap-2 text-xs font-semibold text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
          <AlertCircle size={13} />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-brand hover:bg-brand/85 disabled:opacity-60 disabled:cursor-not-allowed text-white text-base font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <><Loader2 size={18} className="animate-spin" />{statusLabel[status]}</>
        ) : (
          <><Wallet size={18} />Deploy & Create Pool</>
        )}
      </button>
    </form>
  );
}
