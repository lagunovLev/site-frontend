import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "header": "#f5c773",
        "menu": "#d9a74c",
        "menu2": "#edb652",
        "bisque": "#FFE4C4FF",
        "textcolor": "#a4731b",
        "textcolor2": "#845c15",
        "block": "#ffdfa8",
        "button": "#ffc35e"
      }
    }
  },
  plugins: [],
};
export default config;
