import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Browser-side client — uses anon key
export const supabase = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
