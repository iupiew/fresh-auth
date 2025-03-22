import { Handlers } from "$fresh/server.ts";
import { supabase } from "lib/supabase.ts";
import { setCookie } from "$std/http/cookie.ts";
import { getRedis } from "lib/redis.ts";

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    try {
      const { email, password } = await req.json();
      if (!email || !password) throw new Error("Email and password required");

      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;

      console.log(`[SIGNUP] Created user: ${data.user?.email}`);

      if (data.session) {
        const redis = await getRedis();
        await redis.set(
          data.session.access_token,
          JSON.stringify(data),
          { EX: data.session.expires_in } // Consistent Redis options format
        );

        const headers = new Headers();
        setCookie(headers, {
          name: "auth",
          value: data.session.access_token,
          maxAge: data.session.expires_in,
          path: "/",
          secure: url.protocol === "https:", // Dynamic security
          httpOnly: true,
          sameSite: "Lax",
        });

        // Redirect to home page after successful sign-up
        headers.set("Location", "/");
        return new Response(null, { // Empty body for redirects
          status: 303,
          headers,
        });
      }

      // If no session (email confirmation required scenario)
      return new Response(JSON.stringify({ 
        message: "Check your email for confirmation link"
      }), { status: 200 });
      
    } catch (error) {
      console.error("[SIGNUP ERROR]", error);
      return new Response(JSON.stringify({ 
        error: error.message || "Signup failed"
      }), { status: 400 });
    }
  },
};
