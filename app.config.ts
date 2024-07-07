import { defineConfig } from "@solidjs/start/config";
import solidSvg from 'vite-plugin-solid-svg';
import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
// import styleX from 'vite-plugin-stylex';
import type { StylexPluginOptions } from 'vite-plugin-stylex-dev';
import { stylex } from "vite-plugin-stylex-dev";

export default defineConfig({
  vite: {
    plugins: [
      tsconfigPaths(),
      solidSvg(),
      // styleX(),
      stylex({
        unstable_moduleResolution: undefined,
        useCSSLayers: true,
        genConditionalClasses: true,
        treeshakeCompensation: false,
      } as StylexPluginOptions)
    ],
    resolve: {
      alias: {
        "@fonts": resolve("src/fonts"),
      }
    }
  },
  server: {
    preset: "vercel",
    prerender: {
      // routes: ["/", "/home"]
      crawlLinks: true
    },
    future: {
      nativeSWR: true,
    },
    minify: true,
    sourceMap: false,
  },
  // extensions: ["tsx"],
  ssr: true,
  // experimental: {
  //   islands: true,
  // }
});
