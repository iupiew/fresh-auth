import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/supabase.ts";
import { setCookie } from "$std/http/cookie.ts";
import { getRedis } from "lib/redis.ts"; // ✅ Fix import

export const handler: Handlers = {
  async POST(req) {
    try {
      const { email, password } = await req.json();

      console.log(`[AUTH] Attempting sign-in for ${email}`);
      if (!email || !password) throw new Error("Email and password required");

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      const user = data.user;
      console.log(`[AUTH SUCCESS] User signed in: ${user.id}`);

      if (data.session) {
        const redis = await getRedis(); // ✅ Get Redis client
        await redis.set(data.session.access_token, JSON.stringify(data), {
          EX: data.session.expires_in, // ✅ Correct format
        });
      	console.log(`[AUTH SUCCESS] User signed in: ${user.id}`);

        // Set auth cookie
        const headers = new Headers();
        setCookie(headers, {
          name: "auth",
          value: data.session.access_token,
          maxAge: data.session.expires_in,
          path: "/",
          secure: true,
          httpOnly: true,
          sameSite: "Lax",
        });

        console.log(`[COOKIE] Auth cookie set for user ${user.id}`);
        return new Response(JSON.stringify({ user }), { status: 200, headers });
      }

      return new Response(JSON.stringify({ user }), { status: 200 });
    } catch (error) {
      console.error("[ERROR] Sign-in failed", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

  },
};

