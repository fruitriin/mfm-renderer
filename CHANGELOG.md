# Changelog

このプロジェクトの主な変更を記録する。

## [0.2.0] - 2026-10-26

### 追加

- `$[clickable.ev=名前 ...]` に対応した（`Fn/Clickable.vue`）。押されると、provide/inject（`mfmClickEvKey`）を通して `MfmRenderer` が `clickEv` イベントで `名前` を渡す。Misskey Play の `Ui:C:mfm` の `onClickEv` に対応するためのものである
- `Rotate` と `Clickable` をプラグインに登録した。これまで `Rotate` は登録されておらず、`$[rotate ...]` が表示されなかった
- 型定義（`dist/types/library.d.ts`）をパッケージに含めるようにした。これまでは `types` に書かれた `dist/index.d.ts` が存在しなかった

### 変更

- セキュリティ修正を含む mfm-js 0.28.0 に更新した（Unicode 17.0 までの絵文字、`.` を含む acct のメンションにも対応）。mfm.js 0.27.0 と 0.28.0 では、細工した入力で解析時間が際限なく延びる問題（DoS）を直すため、解析器が作り直されている。これまでの `^0.24.0` では 0.25.0 未満しか入らず、この修正が届かなかった
- `$[clickable ...]` の中身に `user-select: none` を付け、押したときに文字が選択されないようにした（Misskey 本体の #17904 に合わせた）
- 登録されていない関数（`unixtime` など）は、Misskey と同じく `$[名前 ...]` のまま表示するようにした
- `Mention` と `EmojiCode` は、inject した `domain` と `emojis` を `unref` で読むようにした。ref・computed でもプレーンな値でも受け付ける
- `domain` がないときは、メンションのアバターを取りに行かないようにした
- `dist/` を git の管理から外した。GitHub から直接インストールしたときは、`prepare` でビルドする。npm に公開するときは `prepublishOnly` でビルドする
- ビルドを ES と UMD の2回に分けた
  - ES ビルドは `vue`・`mfm-js`・`shiki` を同梱せず、利用側の依存から読み込む
  - UMD ビルドは `mfm-js` を同梱し、`shiki` は同梱しない
- `BlockCode` は `shiki` を必要になったときに読み込むようにした。読み込めない環境（UMD を script タグで使う場合など）では、ハイライトせずに表示する
- npm 向けに package.json を整えた
  - `vue` を `peerDependencies` に移した
  - `description`・`keywords`・`license`・`repository`・`homepage`・`bugs`・`sideEffects` を足した
  - `exports` に `types` を足した
- README のインストール手順と使い方を、`MfmRenderer` コンポーネントと `clickEv` イベントに合わせて直した

### 修正

- `Mention` のアバター取得 URL が `https:/`（スラッシュ1本）になっていたのを直した
- `Mention` は、本文に書かれたホストへ直接アバターを問い合わせていた。閲覧者の IP が任意のサーバーに伝わるため、接続先（`domain`）のサーバーの `users/show` にだけ、`username` と `host` を渡して問い合わせるようにした。あわせて、リモートユーザーで別人のアバターが出ることがある問題と、`token` が素早く変わったときに古いレスポンスで上書きされる問題を直した
- `Mention` のリンク先が、リモートユーザーではホスト名だけ（相対リンク）になっていたのを直した

## [0.1.0] - 2026-10-26

初回リリース。リポジトリ作成からこれまでの主な変更は次のとおりである。

- 全コンポーネントを `<script setup>` 構文へ書き換えた（#5）
- `sparkle`（#18）と `border`（#37）を実装した
- 全アニメーションに `delay` パラメータを追加し、`MfmFn` 型と統合した（#33, #35）
- `spin` に `axis`・`direction` パラメータを追加し、アニメーションのプロパティを Misskey の実装に合わせた（#43, #56）
- `scale` の className を直し、最大値の制限を加えた（#41）
- `font` の `Object.keys()` の誤用、Fn コンポーネントのクラス名、`blur` の不要な fontFamily を直した（#39, #40, #55）
- `rotate` が `token.args.deg` を読むように直した
- Shiki でコードブロックをシンタックスハイライトするようにした（#57）
- `library.ts` のコンポーネント登録を短縮構文に変えた（#53）
- TypeScript の型エラーを直し、`@` エイリアスを追加した（#15, #46, #48）
- ESLint の設定と、build・lint・GitHub Pages・Claude Code Review の各ワークフローを追加した（#50 ほか）

このタグの時点で git に入っている `dist/` は #35 のころのビルドのままで、最新のソースとは一致しない。
