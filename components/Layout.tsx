import { Head } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";
import { ServerState } from "routes/_middleware.ts";
import { NavButton, NavLink } from "components/index.ts";

type Props = {
  children: ComponentChildren;
  state: ServerState;
};

export function Layout(props: Props) {
  const user = props.state.user;

  return (
    <>
      <Head>
        <title>Fresh Auth Demo</title>
        {/* Add global background */}
        <style>{`
          html, body {
            background-color: var(--color-primary);
          }
        `}</style>
      </Head>

      {/* Original structure with background fixes */}
      <div class="bg-primary min-h-screen">
        <nav class="flex items-center justify-between flex-wrap min-h-[80px] max-w-screen-md mx-auto p-4 bg-primary">
          <a href="/">
            <div class="flex flex-shrink-0 border-white">
              <img
                src="/logo.svg"
                class="w-16 h-16"
                alt="the fresh logo: a sliced lemon dripping with juice"
              />
            </div>
          </a>

          <div class="flex flex-grow border-gray pt-1 bg-primary">
            <div class="flex flex-grow"></div>
            <div class="flex sm:flex-shrink-0 bg-primary">
              {!user ? (
                <>
                  <NavLink href="/sign-up">Create account</NavLink>
                  <NavButton href="/sign-in">Sign In</NavButton>
                </>
              ) : (
                <form method="post" action="/api/sign-out">
                  <button
                    type="submit"
                    class="inline-block cursor-pointer font-bold text-white px-4 py-2 rounded-xl border(gray-500 2) hover:bg-gray-200 disabled:(opacity-50 cursor-not-allowed)"
                  >
                    Sign Out
                  </button>
                </form>
              )}
            </div>
          </div>
        </nav>

        {/* Main content area */}
        <div class="mx-auto max-w-screen-md p-4 bg-primary min-h-[calc(100vh-80px)]">
          {props.children}
        </div>
      </div>
    </>
  );
}
