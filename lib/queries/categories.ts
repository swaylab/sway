import { supabase } from "@/lib/supabase/client";

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id");

  if (error) throw error;
  return data as Category[];
}

export async function getCategoryWithPools(categoryId: string) {
  const [categoryResult, poolsResult] = await Promise.all([
    supabase.from("categories").select("*").eq("id", categoryId).single(),
    supabase
      .from("pools")
      .select("*, categories(id, label)")
      .eq("category_id", categoryId)
      .order("created_at", { ascending: false }),
  ]);

  if (categoryResult.error) throw categoryResult.error;
  if (poolsResult.error) throw poolsResult.error;

  return {
    category: categoryResult.data as Category,
    pools: poolsResult.data as Pool[],
  };
}
