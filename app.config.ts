import { defineConfig } from "@solidjs/start/config";
import solidSvg from 'vite-plugin-solid-svg';
import { resolve } from 'path';
// import tsconfigPaths from 'vite-tsconfig-paths';
import styleX from 'vite-plugin-stylex';
// import type { StylexPluginOptions } from 'vite-plugin-stylex-dev';
// import { stylex } from "vite-plugin-stylex-dev";

export default defineConfig({
  vite: {
    plugins: [
      // tsconfigPaths(),
      solidSvg(),
      styleX(),
      // stylex({
      //   // dev: process.env.NODE_ENV === 'development',
      //   // runtimeInjection: false,
      //   unstable_moduleResolution: undefined,
      //   useCSSLayers: true,
      //   genConditionalClasses: true,
      //   treeshakeCompensation: false,
      // } as StylexPluginOptions)
    ],
    resolve: {
      alias: {
        "@fonts": resolve("src/fonts"),
      }
    },
    build: {
      sourcemap: false,
      cssMinify: true,
      minify: true,
      target: 'modules'
    },
    // ssr: {
    //   noExternal: true,
    // }
    css: {
      transformer: 'lightningcss',
    },
  },
  server: {
    preset: "vercel",
    prerender: {
      // routes: ["/", "/home"]
      crawlLinks: true
    },
    // future: {
    //   nativeSWR: true,
    // },
    minify: true,
    sourceMap: false,
    // inlineDynamicImports: true,
    // rollupConfig: {
    //   output: {
    //     manualChunks: {}
    //   }
    // }
  },
  // extensions: ["tsx"],
  // experimental: {
  //   islands: true,
  // }
});
