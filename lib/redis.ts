
import { createClient } from "npm:redis@4.6.7";

// Load environment variables if using a .env file
import "https://deno.land/std@0.224.0/dotenv/load.ts";

// Fetch and validate Redis environment variables
const REDIS_HOST = Deno.env.get("REDIS_HOST");
const REDIS_PORT_STR = Deno.env.get("REDIS_PORT");
const REDIS_PORT = REDIS_PORT_STR ? parseInt(REDIS_PORT_STR, 10) : NaN;
const REDIS_USERNAME = Deno.env.get("REDIS_USERNAME") || "default";
const REDIS_PASSWORD = Deno.env.get("REDIS_PASSWORD");

// Debug logs to check if variables are set correctly
console.log("🔍 REDIS_HOST:", REDIS_HOST);
console.log("🔍 REDIS_PORT (string):", REDIS_PORT_STR);
console.log("🔍 REDIS_PORT (parsed):", REDIS_PORT);
console.log("🔍 REDIS_USERNAME:", REDIS_USERNAME);

if (!REDIS_HOST || !REDIS_PORT_STR || isNaN(REDIS_PORT) || !REDIS_PASSWORD) {
  throw new Error("❌ Missing or invalid Redis environment variables. Check your .env or export them.");
}

let client: ReturnType<typeof createClient> | null = null;

export async function getRedis() {
  if (!client) {
    console.log("[REDIS] Connecting to Redis...");
client = createClient({
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    tls: {
      rejectUnauthorized: false, // Prevents TLS verification issues
    },
  },
});

	client.on("connect", () => console.log("[REDIS] Connected successfully"));
    	client.on("error", (err) => console.error("❌ Redis Client Error:", err));

    await client.connect();
    console.log("✅ Redis connected successfully!");
  }
  return client;
}

