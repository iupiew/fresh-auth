// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_middleware from "./routes/_middleware.ts";
import * as $api_sign_in from "./routes/api/sign-in.ts";
import * as $api_sign_out from "./routes/api/sign-out.ts";
import * as $api_sign_up from "./routes/api/sign-up.ts";
import * as $index from "./routes/index.tsx";
import * as $secret from "./routes/secret.tsx";
import * as $sign_in from "./routes/sign-in.tsx";
import * as $sign_up from "./routes/sign-up.tsx";
import * as $AuthForm from "./islands/AuthForm.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_middleware.ts": $_middleware,
    "./routes/api/sign-in.ts": $api_sign_in,
    "./routes/api/sign-out.ts": $api_sign_out,
    "./routes/api/sign-up.ts": $api_sign_up,
    "./routes/index.tsx": $index,
    "./routes/secret.tsx": $secret,
    "./routes/sign-in.tsx": $sign_in,
    "./routes/sign-up.tsx": $sign_up,
  },
  islands: {
    "./islands/AuthForm.tsx": $AuthForm,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
