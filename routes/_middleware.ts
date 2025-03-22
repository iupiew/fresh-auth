
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies, setCookie, deleteCookie } from "$std/http/cookie.ts";
import type { User } from "@supabase/supabase-js";
import { getRedis } from "lib/redis.ts"; // ✅ Fix import
import { supabase } from "lib/supabase.ts";

export type ServerState = {
  user: User | null;
};

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<ServerState>,
) {
  const url = new URL(req.url);
  const cookies = getCookies(req.headers);
  const access_token = cookies.auth;

  ctx.state.user = null; // Default to no user

  if (access_token) {
    const redis = await getRedis(); // ✅ Get Redis client
    const session = await redis.get(access_token);

    if (session) {
      ctx.state.user = JSON.parse(session.toString()).user;
    } else {
      // Token expired, delete the cookie
      const headers = new Headers(req.headers);
      deleteCookie(headers, "auth");
      return new Response(null, { status: 303, headers });
    }
  }

  return await ctx.next();
}


