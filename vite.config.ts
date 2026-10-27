import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import react from "@vitejs/plugin-react";
import path from "path";

// ビルドは3回に分ける
// - 既定（ES）: vue・mfm-js・shiki・misskey-js を external にし、利用側の依存から読み込ませる
// - --mode umd: script タグでも使えるよう mfm-js は同梱する。shiki は大きいので同梱せず、読み込めなければハイライトなしで表示する
//   misskey-js（にゃー化に使う）も同梱せず、読み込めなければにゃー化しない
// - --mode react: React 版（mfm-renderer/react）を dist/react に出力する。ES だけを出力する
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isUmd = mode === "umd";
  const isReact = mode === "react";
  const alias = {
    "@": path.resolve(import.meta.dirname, "./src"),
  };

  if (isReact) {
    return {
      plugins: [react()],
      resolve: { alias },
      build: {
        outDir: "dist/react",
        // Vue 版の後に出力するので、dist/react だけを空にする
        emptyOutDir: true,
        lib: {
          entry: "src/react/index.ts",
          fileName: "index",
          cssFileName: "style",
          formats: ["es"],
        },
        rollupOptions: {
          // ライブラリに同梱しない依存
          external: ["react", /^react\//, "react-dom", /^react-dom\//, "mfm-js", "shiki", /^shiki\//, /^misskey-js\//],
        },
      },
    };
  }

  return {
    // 開発サーバーでは React 版のプレビュー（react.html・compare.html）も開けるようにする
    plugins: command === "serve" ? [vue(), react()] : [vue()],

    resolve: { alias },

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
