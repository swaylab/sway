import { ethers } from "hardhat";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: "../../.env.local" });

const AVAX_PRICE_USD = 25; // rough estimate for AVAX → USD conversion display only

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);
  console.log("Balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "AVAX\n");

  const network = await ethers.provider.getNetwork();
  const isTestnet = network.chainId === 43113n;
  const explorerBase = isTestnet
    ? "https://testnet.snowtrace.io/address"
    : "https://snowtrace.io/address";

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Fetch pools that don't have a contract yet
  const { data: pools, error } = await supabase
    .from("pools")
    .select("id, title, target_price, min_participants, contract_address")
    .is("contract_address", null);

  if (error) throw error;
  if (!pools || pools.length === 0) {
    console.log("No pools without a contract address. All done.");
    return;
  }

  console.log(`Found ${pools.length} pool(s) to deploy contracts for.\n`);

  const SwayPool = await ethers.getContractFactory("SwayPool");

  for (const pool of pools) {
    // Convert USD target_price to AVAX wei
    // target_price is in USD — divide by AVAX_PRICE_USD to get AVAX, then to wei
    const priceInAvax = pool.target_price / AVAX_PRICE_USD;
    const priceInWei = ethers.parseEther(priceInAvax.toFixed(6));

    console.log(`Deploying "${pool.title}"`);
    console.log(`  target_price: $${pool.target_price} → ${priceInAvax.toFixed(4)} AVAX per unit`);
    console.log(`  min_participants: ${pool.min_participants}`);

    const contract = await SwayPool.deploy(priceInWei, pool.min_participants);
    await contract.waitForDeployment();
    const address = await contract.getAddress();

    console.log(`  Contract: ${address}`);
    console.log(`  Explorer: ${explorerBase}/${address}\n`);

    // Write contract_address back to Supabase
    const { error: updateError } = await supabase
      .from("pools")
      .update({ contract_address: address })
      .eq("id", pool.id);

    if (updateError) {
      console.error(`  ERROR updating Supabase for pool ${pool.id}:`, updateError.message);
    } else {
      console.log(`  Supabase updated.\n`);
    }
  }

  console.log("All contracts deployed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
