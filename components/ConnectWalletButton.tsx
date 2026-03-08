"use client";

import { useState, useEffect } from "react";
import { Wallet, Loader2 } from "lucide-react";
import { ACTIVE_CHAIN } from "@/lib/contracts/SwayPool.abi";

declare global {
  interface Window {
    ethereum?: import("ethers").Eip1193Provider & { on: (event: string, handler: (...args: unknown[]) => void) => void };
  }
}

export default function ConnectWalletButton() {
  const [account, setAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!window.ethereum) return;
    window.ethereum
      .request({ method: "eth_accounts" })
      .then((accounts: unknown) => {
        const list = accounts as string[];
        if (list.length > 0) setAccount(list[0]);
      })
      .catch(() => {});

    window.ethereum.on("accountsChanged", (accounts: unknown) => {
      const list = accounts as string[];
      setAccount(list[0] ?? null);
    });
  }, []);

  async function connect() {
    if (!window.ethereum) {
      alert("No wallet found. Install MetaMask or Core Wallet.");
      return;
    }

    setLoading(true);
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" }) as string[];
      setAccount(accounts[0]);

      // Switch to Avalanche
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${ACTIVE_CHAIN.chainId.toString(16)}` }],
        });
      } catch {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: `0x${ACTIVE_CHAIN.chainId.toString(16)}`,
            chainName: ACTIVE_CHAIN.name,
            rpcUrls: [ACTIVE_CHAIN.rpc],
            nativeCurrency: { name: "AVAX", symbol: "AVAX", decimals: 18 },
          }],
        });
      }
    } catch {
      // user rejected
    } finally {
      setLoading(false);
    }
  }

  if (account) {
    return (
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-white/[0.08] text-sm font-bold text-lgray transition-colors">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        {account.slice(0, 6)}...{account.slice(-4)}
      </button>
    );
  }

  return (
    <button
      onClick={connect}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand hover:bg-brand/85 disabled:opacity-60 text-sm font-bold text-white transition-colors"
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : <Wallet size={14} />}
      Connect Wallet
    </button>
  );
}
