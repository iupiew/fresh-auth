import { JSX } from "preact";
import { Link } from "components/index.ts";

export function NavLink(props: JSX.HTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      {...props}
      class="!text-white font-bold px-4 text-white !hover:text-white hover:no-underline"
    />
  );
}
