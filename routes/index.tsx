import { Handlers, PageProps } from "$fresh/server.ts";
import { ServerState } from "routes/_middleware.ts";
import { Layout, Link } from "components/index.ts";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render(ctx.state);
  },
};

export default function Home(props: PageProps<ServerState>) {
  const user = props.data.user;

  return (
    <Layout state={props.data}>
      <div class="min-h-screen bg-primary p-4">
        <div class="max-w-2xl mx-auto text-white h-full">
          <div class="bg-primary rounded-lg p-6 h-full">
            {!user ? (
              <>
                <h2 class="text-3xl font-bold mb-6 text-accent">
                  Fresh Auth Demo
                </h2>
                <p class="mb-6 text-lg">
                  An example app built with Deno's{" "}
                  <Link 
                    href="https://fresh.deno.dev/" 
                    target="_blank" 
                    class="text-accent hover:text-accent-dark"
                  >
                    Fresh
                  </Link>{" "}
                  framework, using{" "}
                  <Link 
                    href="https://supabase.com/" 
                    target="_blank" 
                    class="text-accent hover:text-accent-dark"
                  >
                    Supabase
                  </Link>{" "}
                  and{" "}
                  <Link 
                    href="https://redis.io/" 
                    target="_blank" 
                    class="text-accent hover:text-accent-dark"
                  >
                    Redis
                  </Link>{" "}
                  to implement authentication.
                </p>
              </>
            ) : (
              <>
                <h2 class="text-3xl font-bold mb-6 text-accent">
                  Yeees! You've made it!
                </h2>
                <p class="text-xl">
                  Logged in as:{" "}
                  <span class="text-accent font-bold">{user.email}</span>
                </p>
              </>
            )}

            <div class="mt-8 flex justify-center">
              <a
                href="https://fresh.deno.dev"
                target="_blank"
                class="hover:scale-105 transition-transform"
              >
                <img
                  width="197"
                  height="37"
                  src="https://fresh.deno.dev/fresh-badge-dark.svg"
                  alt="Made with Fresh"
                  class="bg-transparent"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
