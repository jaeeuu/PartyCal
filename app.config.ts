import { defineConfig } from "@solidjs/start/config";
import solidSvg from 'vite-plugin-solid-svg';
import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
// import styleX from 'vite-plugin-stylex';
import type { StylexPluginOptions } from 'vite-plugin-stylex-dev';
import { stylex } from "vite-plugin-stylex-dev";
// import stylexPlugin from '@stylexjs/rollup-plugin';

export default defineConfig({
  vite: {
    plugins: [
      tsconfigPaths(),
      solidSvg(),
      // styleX(),
      stylex({
        // dev: process.env.NODE_ENV === 'development',
        // runtimeInjection: false,
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
    },
    build: {
      // rollupOptions: {
      //   plugins: [stylexPlugin({ fileName: 'stylex.css', useCSSLayers: true, genConditionalClasses: true})]
      // },
      // sourcemap: false,
      // cssMinify: true,
    },
    // ssr: {
    //   noExternal: true,
    // }
    // css: {
    //   transformer: 'lightningcss',
    // },
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
    // minify: true,
    // sourceMap: false,
    // inlineDynamicImports: true,
    // rollupConfig: {
    //   output: {
    //     manualChunks: {}
    //   }
    // }
  },
  // extensions: ["tsx"],
  experimental: {
    islands: true,
  }
});
