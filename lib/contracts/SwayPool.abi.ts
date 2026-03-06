export const SWAY_POOL_ABI = [
  // State reads
  "function pricePerUnit() view returns (uint256)",
  "function minParticipants() view returns (uint256)",
  "function participantCount() view returns (uint256)",
  "function totalLocked() view returns (uint256)",
  "function hasJoined(address) view returns (bool)",
  "function released() view returns (bool)",
  "function refunded() view returns (bool)",
  "function creator() view returns (address)",
  "function getParticipants() view returns (address[])",

  // Actions
  "function join() payable",
  "function release(address seller)",
  "function refundAll()",

  // Events
  "event Joined(address indexed participant)",
  "event Released(address indexed seller, uint256 amount)",
  "event Refunded(uint256 count)",
] as const;

// Chain config
export const AVAX_CHAINS = {
  fuji: {
    chainId: 43113,
    name: "Avalanche Fuji Testnet",
    rpc: "https://api.avax-test.network/ext/bc/C/rpc",
    explorer: "https://testnet.snowtrace.io",
    symbol: "AVAX",
  },
  mainnet: {
    chainId: 43114,
    name: "Avalanche C-Chain",
    rpc: "https://api.avax.network/ext/bc/C/rpc",
    explorer: "https://snowtrace.io",
    symbol: "AVAX",
  },
} as const;

export const ACTIVE_CHAIN =
  process.env.NEXT_PUBLIC_AVAX_CHAIN === "avalanche"
    ? AVAX_CHAINS.mainnet
    : AVAX_CHAINS.fuji;
