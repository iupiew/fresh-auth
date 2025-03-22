import { JSX } from "preact";
import { Button } from "components/index.ts";

export function NavButton(props: JSX.HTMLAttributes<HTMLAnchorElement>) {
  return (
    <Button
      {...props}
      class="rounded-xl font-bold !border(white 2) text-white hover:bg-primaryStrong !hover:border-primaryLight"
    />
  );
}
