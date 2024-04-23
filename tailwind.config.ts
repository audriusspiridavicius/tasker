import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");
const config: Config = {
  content: [
   
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // "./node_modules/tailwind-datepicker-react/dist/**/*.js", // <--- Add this line
    flowbite.content(),
    // "./node_modules/flowbite-react/lib/**/*.js",

  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [flowbite.plugin()],
  // plugins: [require('flowbite/plugin')],
};
export default config;
