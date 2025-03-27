import { Options } from "$fresh/plugins/twind.ts";
import * as colors from "twind/colors";

export default {
  selfURL: import.meta.url,
  theme: {
    colors,
    extend: {
      colors: {
        primary: "#26233a",        // Brave dark background
        primaryStrong: "#393552",  // Brave accent green
        primaryLight: "#f2e9e1",   // Brave light text
      },
    },
  },
  preflight: (preflight, { theme: _theme }) => ({
    ...preflight,
    div: {
      alignItems: "center",
    },
    h1: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    p: {
      margin: "8px 0px 8px 0px",
    },
  }),
} as Options;
