import { defineConfig } from "@solidjs/start/config";
import solidSvg from 'vite-plugin-solid-svg';
import { resolve } from 'path';
// import tsconfigPaths from 'vite-tsconfig-paths';
import styleX from 'vite-plugin-stylex';
// import type { StylexPluginOptions } from 'vite-plugin-stylex-dev';
// import { stylex } from "vite-plugin-stylex-dev";
// import { FontaineTransform } from 'fontaine'

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
      // FontaineTransform.vite({
      //   fallbacks: ['Arial'],
      //   resolvePath: id => {
      //     if (id.includes('400')) {
      //       return new URL(`./public/fonts/400${id}`, import.meta.url).href;
      //     } else if (id.includes('500')) {
      //       return new URL(`./public/fonts/500${id}`, import.meta.url).href;
      //     } else if (id.includes('600')) {
      //       return new URL(`./public/fonts/600${id}`, import.meta.url).href;
      //     } else if (id.includes('700')) {
      //       return new URL(`./public/fonts/700${id}`, import.meta.url).href;
      //     }
      //   }
      // }),
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
    static: true,
    prerender: {
      routes: ["/", "/new", "/s", "/s/[...id]"],
      // crawlLinks: true
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
