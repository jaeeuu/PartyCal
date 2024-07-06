import { defineConfig } from "@pandacss/dev"
 
export default defineConfig({
  presets: [],
  eject: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
  minify: true,
  hash: true,
  clean: true,
  lightningcss: true,
  polyfill: false,
  shorthands: true,
  // globalCss: {
  //   "html, body": {
  //     margin: 0,
  //     padding: 0,
  //   }
  // },
  jsxFramework: "solid",
})