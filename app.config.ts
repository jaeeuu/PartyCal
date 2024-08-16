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
      solidSvg({
        svgo: {
          enabled: false,
        }
      }),
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
      // cssCodeSplit: true,
      // cssMinify: "lightningcss",
      // minify: true,
      // target: 'modules'
    },
    // ssr: {
    //   external: true,
    // },
    css: {
      transformer: "lightningcss",
    },
    server: {
      watch: {
        ignored: ["**/src-back/**"],
      }
    }
  },
  server: {
    prerender: {
      // routes: ["/", "/new"]
      crawlLinks: true
    },
    // future: {
    //   nativeSWR: true,
    // },
    // minify: true,
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
