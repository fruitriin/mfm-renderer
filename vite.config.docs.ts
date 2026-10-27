import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/mfm-renderer",
  plugins: [vue(), react()],

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },

  build: {
    outDir: "docs",
    rollupOptions: {
      // Vue 版・React 版・比較の 3 つのページを出力する
      input: {
        index: path.resolve(import.meta.dirname, "index.html"),
        react: path.resolve(import.meta.dirname, "react.html"),
        compare: path.resolve(import.meta.dirname, "compare.html"),
      },
    },
  },
});
