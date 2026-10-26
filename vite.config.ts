import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// ビルドは2回に分ける
// - 既定（ES）: vue・mfm-js・shiki を external にし、利用側の依存から読み込ませる
// - --mode umd: script タグでも使えるよう mfm-js は同梱する。shiki は大きいので同梱せず、読み込めなければハイライトなしで表示する
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isUmd = mode === "umd";
  return {
    plugins: [vue()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    build: {
      outDir: "dist",
      // UMD は ES ビルドの後に同じ dist へ追加で出力する
      emptyOutDir: !isUmd,

      lib: {
        entry: "src/library.ts",
        name: "MMFMRenderer",
        fileName: "MMFMRenderer",
        formats: isUmd ? ["umd"] : ["es"],
      },
      rollupOptions: {
        // ライブラリに同梱しない依存
        external: isUmd
          ? ["vue", "shiki"]
          : ["vue", "mfm-js", "shiki", /^shiki\//],
        output: {
          // UMD ビルドで external にした依存のグローバル名
          globals: {
            vue: "Vue",
          },
          ...(isUmd ? { inlineDynamicImports: true } : {}),
        },
      },
    },
  };
});
