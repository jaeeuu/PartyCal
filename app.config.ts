import { defineConfig } from "@solidjs/start/config";
import solidSvg from 'vite-plugin-solid-svg';
import { stylex } from "vite-plugin-stylex-dev";
import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
// import styleX from 'vite-plugin-stylex';
import type { StylexPluginOptions } from 'vite-plugin-stylex-dev';

export default defineConfig({
  vite: {
    plugins: [
      solidSvg(),
      // styleX(),
      stylex({
        unstable_moduleResolution: undefined,
        useCSSLayers: true,
        // genConditionalClasses: true,
        treeshakeCompensation: false,
      } as StylexPluginOptions),
      tsconfigPaths()
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
    }
  }
});
