"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Wallet, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { SWAY_POOL_ABI, ACTIVE_CHAIN } from "@/lib/contracts/SwayPool.abi";
import { supabase } from "@/lib/supabase/client";

type Props = {
  poolId: string;
  contractAddress: string;
};

type Status = "idle" | "connecting" | "switching" | "joining" | "success" | "error";

declare global {
  interface Window {
    ethereum?: import("ethers").Eip1193Provider & { on: (event: string, handler: (...args: unknown[]) => void) => void };
  }
}

export default function JoinPoolButton({ poolId, contractAddress }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [account, setAccount] = useState<string | null>(null);
  const [priceInAvax, setPriceInAvax] = useState<string | null>(null);

  useEffect(() => {
    async function loadPrice() {
      try {
        const provider = new ethers.JsonRpcProvider(ACTIVE_CHAIN.rpc);
        const contract = new ethers.Contract(contractAddress, SWAY_POOL_ABI, provider);
        const price = await contract.pricePerUnit();
        setPriceInAvax(ethers.formatEther(price));
      } catch {
        // silent
      }
    }
    loadPrice();
  }, [contractAddress]);

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

  async function handleJoin() {
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
      setAccount(walletAddress);

      // Switch to Avalanche if needed
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

      setStatus("joining");

      const signer = await browserProvider.getSigner();
      const contract = new ethers.Contract(contractAddress, SWAY_POOL_ABI, signer);
      const price: bigint = await contract.pricePerUnit();
      const tx = await contract.join({ value: price });
      const receipt = await tx.wait();

      // Ensure user exists in users table
      await supabase.from("users").upsert(
        { wallet_address: walletAddress },
        { onConflict: "wallet_address" }
      );

      // Save participant to Supabase
      await supabase.from("pool_participants").insert({
        pool_id: poolId,
        wallet_address: walletAddress,
        tx_hash: receipt.hash,
        amount_locked: parseFloat(ethers.formatEther(price)),
      });

      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      const e = err as { code?: string; reason?: string; message?: string };
      if (e.code === "ACTION_REJECTED" || e.code === "4001") {
        setErrorMsg("Transaction rejected.");
      } else if (e.reason) {
        setErrorMsg(e.reason);
      } else {
        setErrorMsg(e.message ?? "Transaction failed.");
      }
    }
  }

  if (status === "success") {
    return (
      <div className="w-full py-4 flex items-center justify-center gap-2 bg-emerald-400/10 border border-emerald-400/25 rounded-xl">
        <CheckCircle size={18} className="text-emerald-400" />
        <span className="text-base font-bold text-emerald-400">You&apos;re in the pool!</span>
      </div>
    );
  }

  const loading = status === "connecting" || status === "switching" || status === "joining";

  const label: Record<Status, string> = {
    idle: priceInAvax ? `Join Pool — ${parseFloat(priceInAvax).toFixed(2)} AVAX` : "Join Pool",
    connecting: "Connecting wallet...",
    switching: "Switching to Avalanche...",
    joining: "Confirming transaction...",
    success: "Joined!",
    error: priceInAvax ? `Retry — ${parseFloat(priceInAvax).toFixed(2)} AVAX` : "Retry",
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleJoin}
        disabled={loading}
        className="relative w-full py-4 bg-brand hover:bg-brand/85 disabled:opacity-60 disabled:cursor-not-allowed text-white text-base font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : <Wallet size={18} />}
        {label[status]}
      </button>

      {status === "error" && errorMsg && (
        <div className="flex items-center gap-2 text-xs font-semibold text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
          <AlertCircle size={13} />
          {errorMsg}
        </div>
      )}

      {account && status === "idle" && (
        <p className="text-center text-xs font-semibold text-white/25">
          {account.slice(0, 6)}...{account.slice(-4)}
        </p>
      )}
    </div>
  );
}
