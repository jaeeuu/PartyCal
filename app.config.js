import { defineConfig } from "@solidjs/start/config";
import solidSvg from 'vite-plugin-solid-svg';
import styleX from "vite-plugin-stylex";

export default defineConfig({
  plugins: () => [solidSvg(), styleX()],
  server: {
    prerender: {
      routes: ["/", "/home"]
    }
  }
});
