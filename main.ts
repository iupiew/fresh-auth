/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";

import { supabase } from "lib/supabase.ts";
import { getRedis } from "lib/redis.ts";


supabase.auth.onAuthStateChange(async (event, session) => {
  if (event == "SIGNED_IN" || event == "TOKEN_REFRESHED" && session != null) {
    const { access_token, expires_in } = session!;
    const stringified = JSON.stringify(session);
    
    const redis = await getRedis(); // ✅ Get Redis client here

    console.log(`[REDIS] Storing session for user: ${session.user.id}`);
    await redis.set(access_token, stringified, { ex: expires_in });
  }
});


await start(manifest, { plugins: [twindPlugin(twindConfig)], port: 8080 });
