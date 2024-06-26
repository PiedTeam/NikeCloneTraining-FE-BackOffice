// Flow base on https://nextui.org/docs/guide/installation

import { nextui } from "@nextui-org/react";
import { Config } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        custom: ["20px", "20px"],
      },
      colors: {
        "text-red": "#450a0a",
        "text-blue": "#172554",
        "text-yellow": "#eab308",
        "text-green": "#15803d",
      },
      gridTemplateColumns: {
        dashboard: "20% 80%",
        sidebar: "20% 20% 54% ",
      },
    },
  },
  plugins: [
    nextui({
      prefix: "nextui",
      addCommonColors: false,
    }),
  ],
};

export default config;
