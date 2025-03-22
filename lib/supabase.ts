import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";
import { load } from "$std/dotenv/mod.ts";

// Load environment variables
await load({ export: true });

// Validate required environment variables
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_KEY = Deno.env.get("SUPABASE_KEY");

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error(
    "Supabase credentials missing! Add SUPABASE_URL and SUPABASE_KEY to .env",
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
