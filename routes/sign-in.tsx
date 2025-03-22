
import { Handlers, PageProps } from "$fresh/server.ts";
import { ServerState } from "routes/_middleware.ts";
import { Layout } from "components/index.ts";
import AuthForm from "../islands/AuthForm.tsx"; // ✅ Correct import from islands

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render(ctx.state);
  },
};

export default function SignInPage(props: PageProps<ServerState>) {
  return (
    <Layout state={props.data}>
      <div class="flex justify-center">
        <div class="flex flex-col items-stretch w-[500px] md:w-2/3">
          <AuthForm mode="In" /> {/* ✅ Correctly using the island */}
        </div>
      </div>
                <img
                  width="197"
                  height="37"
                  src="https://fresh.deno.dev/fresh-badge-dark.svg"
                  alt="Made with Fresh"
                  class="bg-transparent mx-auto mt-4"
                />
    </Layout>
  );
}

