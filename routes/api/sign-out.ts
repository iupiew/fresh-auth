import { Handlers } from "$fresh/server.ts";
import { deleteCookie } from "$std/http/cookie.ts";
import { getRedis } from "lib/redis.ts";

export const handler: Handlers = {
  async POST(req) {
    const headers = new Headers();
    const cookies = req.headers.get("cookie") || "";
    const authToken = cookies.match(/auth=([^;]+)/)?.[1];

    try {
      if (authToken) {
        const redis = await getRedis();
        await redis.del(authToken);
        console.log(`[REDIS] Deleted session: ${authToken.slice(0, 6)}...`);
      }

      // Proper cookie deletion with same path as creation
      deleteCookie(headers, "auth", {
        path: "/",
      });

      // Force redirect to refresh auth state
      headers.set("Location", "/");
      return new Response(null, {
        status: 303,  // See Other
        headers,
      });
    } catch (error) {
      console.error("[SIGNOUT ERROR]", error);
      headers.set("Location", "/?error=signout_failed");
      return new Response(null, { status: 303, headers });
    }
  },
};
