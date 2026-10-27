# Changelog

このプロジェクトの主な変更を記録する。

## [Unreleased]

### 追加

- `MfmRenderer` に `emojiStyle` と `twemojiBase` を追加した。`emojiStyle: 'twemoji'` にすると、Unicode の絵文字を Twemoji の画像（高さ 1.25em）で描き、Misskey の既定の見た目になる。既定は今までどおり `'native'`（OS の絵文字）。画像を読めなかったときは OS の絵文字で表示する

## [0.3.0] - 2026-10-27

⚠️ 互換性を壊す変更を含む。npm の `^0.2.0` などの範囲には入らないので、更新するときは `0.3.0` を指定する。

### 変更

- `.use(Mfm)` でグローバル登録する構文ごとのコンポーネントに、`Mfm` 接頭辞を付けた（`Bold` → `MfmBold`、`Link` → `MfmLink`、`Fg` → `MfmFg` など）。これまでは接頭辞なしで 40 以上の名前を登録していたため、利用側の同じ名前のコンポーネント（`Link`・`Search` など）と衝突していた（#74）
  - `MfmRenderer` と `MfmComponent` の登録名は変わらない。`MfmRenderer` だけを使っている場合は、書き換えは要らない
  - 構文ごとのコンポーネントを名前で直接使っていた場合は、`<Bold>` を `<MfmBold>` のように書き換える
  - これまでは、利用側が `Link` などの名前でコンポーネントを登録すると、登録した順番によって利用側か MFM のどちらかのコンポーネントが上書きされていた。この版からは衝突しない

## [0.2.1] - 2026-10-27

互換性を壊す変更は含まない。`^0.2.0` で入れている場合も、そのまま更新される。ただし、次の点は利用側が何もしなくても変わる。

- `misskey-js` が依存に加わる（にゃー化に使う。ライブラリには同梱せず、必要になったときだけ読み込む）
- ハッシュタグに色が付く（`--MI_THEME-hashtag`、なければ `--hashtag`）
- `$[fg]`・`$[bg]` に不正な色を指定すると、Misskey と同じく赤（`#f00`）になる

### 追加

- `$[unixtime 1700000000]` に対応した（`Fn/Unixtime.vue`）。Misskey と同じく「絶対時刻 (相対時間)」で表示する（#36）
- `MfmRenderer` に、Misskey の MFM コンポーネントと同じ props を追加した（#69）。既定値は今までの表示と同じになる
  - `nyaize`・`author`: `nyaize` が `'respect'` で `author.isCat` が true のとき、テキストとルビをにゃー化する。引用とリンクの中はにゃー化しない
  - `advancedMfm`・`animatedMfm`: アニメーションを止めると、rainbow は静的な虹色、sparkle は中身だけで表示する。高度な MFM を止めると、x2〜x4・position・scale も効かせない
  - `plain`・`nowrap`・`rootScale`: 改行を空白にした表示、1 行に収めて省略する表示、文字の倍率の初期値
- テーマの色に、Misskey 2024.10 以降の CSS 変数（`--MI_THEME-fg`・`--MI_THEME-accent`・`--MI_THEME-divider`・`--MI_THEME-mention`・`--MI_THEME-hashtag`）を使うようにした。定義されていなければ、以前の名前（`--fg` など）を使う（#65）

### 修正

- コードブロックが、言語の指定がないときなどに黒地に黒文字で読めなかったのを直した。入力が変わったときにハイライトし直すようにし、前後の余分な空白も取り除いた（#62）
- `$[flip.h ...]` が反転せず、`$[flip.v ...]`・`$[flip.h,v ...]` の反転方向も違っていたのを直した（#63）
- `$[position.x=1 ...]` のように片方だけ指定すると表示が崩れていたのを直した。`$[rotate]`・`$[fg]`・`$[bg]` も、不正な引数を Misskey と同じく扱う（#64）
- `$[sparkle.speed=... ]`・`delay` が効いていなかったのを直した（#71）
- Bold・Italic・Small・Strike・Url・Search・UnicodeEmoji・Hashtag・Quote で、`class="bold"` などの class が消えていたのを直した（#65、#71）

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
