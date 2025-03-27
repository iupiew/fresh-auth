import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function FormButton(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class={`flex-grow inline-block cursor-pointer px-4 py-2 rounded-xl border(gray-500 2) disabled:(opacity-50 cursor-not-allowed) bg-yellow-300 border-yellow-200 text-black hover:bg-yellow-200 hover:border-yellow-300 font-bold ${
        props.class ?? ""
      }`}
    />
  );
}
