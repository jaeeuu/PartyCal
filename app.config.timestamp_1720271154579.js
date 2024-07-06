// app.config.ts
import { defineConfig } from "@solidjs/start/config";
import solidSvg from "vite-plugin-solid-svg";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { stylex } from "vite-plugin-stylex-dev";
var app_config_default = defineConfig({
  vite: {
    plugins: [
      solidSvg(),
      // styleX(),
      stylex({
        unstable_moduleResolution: void 0,
        useCSSLayers: true,
        genConditionalClasses: true,
        treeshakeCompensation: false
      }),
      tsconfigPaths()
    ],
    resolve: {
      alias: {
        "@fonts": resolve("src/fonts")
      }
    }
  },
  server: {
    preset: "vercel",
    // prerender: {
    //   // routes: ["/", "/home"]
    //   crawlLinks: true
    // },
    future: {
      nativeSWR: true
    },
    minify: true,
    sourceMap: false
  },
  // extensions: ["tsx"],
  ssr: true,
  experimental: {
    islands: !!import.meta.env.PROD
  }
});
export {
  app_config_default as default
};
