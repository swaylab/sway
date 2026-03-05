import { supabase } from "@/lib/supabase/client";

export async function getPools(categoryId?: string) {
  let query = supabase
    .from("pools")
    .select("*, categories(id, label)")
    .order("created_at", { ascending: false });

  if (categoryId && categoryId !== "all") {
    query = query.eq("category_id", categoryId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Pool[];
}

export async function getPool(id: string) {
  const { data, error } = await supabase
    .from("pools")
    .select("*, categories(id, label)")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Pool;
}

export async function getPoolBids(poolId: string) {
  const { data, error } = await supabase
    .from("bids")
    .select("*, sellers(id, company_name, location, rating, review_count, verified, wallet_address)")
    .eq("pool_id", poolId)
    .order("price", { ascending: true });

  if (error) throw error;
  return data as Bid[];
}

export async function getPoolParticipants(poolId: string) {
  const { data, error } = await supabase
    .from("pool_participants")
    .select("*")
    .eq("pool_id", poolId);

  if (error) throw error;
  return data as PoolParticipant[];
}

export async function getStats() {
  const { count: activePools } = await supabase
    .from("pools")
    .select("*", { count: "exact", head: true })
    .in("status", ["open", "bidding"]);

  const { count: members } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  return {
    activePools: activePools ?? 0,
    members: members ?? 0,
  };
}
