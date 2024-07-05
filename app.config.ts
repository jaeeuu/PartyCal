import { defineConfig } from "@solidjs/start/config";
import solidSvg from 'vite-plugin-solid-svg';
import {stylex} from "vite-plugin-stylex-dev";
import { resolve } from 'path';

export default defineConfig({
  vite: {
    plugins: [solidSvg(), stylex()],
    resolve: {
      alias: {
        "@public": resolve("public"), 
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
