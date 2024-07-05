import { defineConfig } from "@solidjs/start/config";
import solidSvg from 'vite-plugin-solid-svg';
import styleX from "vite-plugin-stylex";
import { resolve } from 'path';

export default defineConfig({
  vite: {
    plugins: [solidSvg(), styleX()],
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
