import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Link(props: JSX.HTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class={`text-yellow-200 hover:underline hover:text-primaryStrong ${
        props.class ?? ""
      }`}
    />
  );
}
