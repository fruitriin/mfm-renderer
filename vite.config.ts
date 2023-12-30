import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  build: {
    outDir: "dist",

    lib: {
      // src/indext.ts is where we have exported the component(s)
      entry: "src/library.ts",
      name: "MMFMRenderer",
      // the name of the output files when the build is run
      fileName: "MMFMRenderer",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
