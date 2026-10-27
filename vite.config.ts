import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// ビルドは2回に分ける
// - 既定（ES）: vue・mfm-js・shiki・misskey-js を external にし、利用側の依存から読み込ませる
// - --mode umd: script タグでも使えるよう mfm-js は同梱する。shiki は大きいので同梱せず、読み込めなければハイライトなしで表示する
//   misskey-js（にゃー化に使う）も同梱せず、読み込めなければにゃー化しない
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isUmd = mode === "umd";
  return {
    plugins: [vue()],

    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
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
        // Vite 7 以降は CSS の名前が lib.name になるので、exports の ./style.css に合わせる
        cssFileName: "style",
        formats: isUmd ? ["umd"] : ["es"],
      },
      rollupOptions: {
        // ライブラリに同梱しない依存
        external: isUmd
          ? ["vue", "shiki", /^misskey-js\//]
          : ["vue", "mfm-js", "shiki", /^shiki\//, /^misskey-js\//],
        output: {
          // UMD ビルドで external にした依存のグローバル名
          globals: {
            vue: "Vue",
          },
        },
      },
    },
  };
});
