import { defineConfig } from "@solidjs/start/config";
import solidSvg from 'vite-plugin-solid-svg';
import { resolve } from 'path';
import styleX from 'vite-plugin-stylex';
// import { FontaineTransform } from 'fontaine'

export default defineConfig({
  vite: {
    plugins: [
      solidSvg(),
      styleX(),
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
      rollupOptions: {
        output: {
          experimentalMinChunkSize: 100_000,
        }
      }
    },
    css: {
      transformer: "lightningcss",
    },
    server: {
      watch: {
        ignored: ["**/src-back/**"],
      }
    },
    
  },

  server: {
    static: true,
    compressPublicAssets: {gzip: true, brotli: true},
    serveStatic: true,
    preset: "github-pages",
    prerender: {
      routes: ["/", "/new", "/s", "/test"],
      // crawlLinks: true
    },
    rollupConfig: {
      output: {
        experimentalMinChunkSize: 100_000,
      },
    },
    minify: true,
    sourceMap: false,
  },
});
