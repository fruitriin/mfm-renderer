# Changelog

このプロジェクトの主な変更を記録する。

## [Unreleased]

### 変更

- 開発用のツールを新しくした。Vite 5 → 8、vue-tsc 1 → 3、TypeScript 5.3 → 6.0、ESLint 8 → 10（flat config の `eslint.config.js` に移した）、Vitest 1 → 5
  - GitHub から入れると `prepare` で Vite 8 を使ってビルドするので、Node.js 20.19 以降が要る（これまでは Node.js 18 でもビルドできた）
  - ビルドの出力（`dist/MMFMRenderer.js`・`dist/MMFMRenderer.umd.cjs`・`dist/style.css`）のファイル名と、同梱しない依存は変わらない。CSS は圧縮の仕方が変わったが、効き方は同じである
  - 型定義（`dist/types`）は vue-tsc 3 の形式で出力される

### 追加

- テストを追加した（`npm test`）。検証関数（`validTime` など）の単体テスト、構文と関数ごとの出力のスナップショット、`MfmRenderer` の props・イベントのテストを含む
- 型チェックだけを行う `npm run typecheck` を追加した。CI でもテストと型チェックを実行する
- `\(x^2\)`・`\[x^2\]`（数式）を、Misskey と同じく `<code>` でそのまま表示するようにした（`MfmMathInline`・`MfmMathBlock`）。これまでは未知の要素になっていた
- `MfmRenderer` に `emojiStyle` と `twemojiBase` を追加した。`emojiStyle: 'twemoji'` にすると、Unicode の絵文字を Twemoji の画像（高さ 1.25em）で描き、Misskey の既定の見た目になる。既定は今までどおり `'native'`（OS の絵文字）。画像を読めなかったときは OS の絵文字で表示する

### 修正（Misskey との違い）

⚠️ `$[...]` の関数の出力する HTML が変わる。関数に付けた class（`Fn spin` など）やスタイルを当てている場合は確かめてほしい。

- **アニメーションなどの CSS がライブラリに入っていなかった**のを直した。`$[spin]`・`$[tada]`・`$[rainbow]` などの keyframes は開発用のページにしかなく、`mfm-renderer/style.css` を読み込んでも動かなかった。Misskey と同じに見えるように `src/mfm.css` に書き起こし、`style.css` に含めた（Misskey の CSS は写していない）
  - keyframes はグローバルに定義され、名前は Misskey と同じ `mfm-spin` などである。Misskey の CSS と同じページで読み込むと、後から読み込んだほうの定義が使われる。どちらでも見た目はほぼ同じだが、twitch・shake の細かい揺れ方は違う
- `$[sparkle]` の粒が動いていなかったのを直した。keyframes を scoped style に置いていたため名前が書き換わり、インラインの animation から参照できなかった
- `$[...]` の関数が、Misskey と同じく自分の要素（`display: inline-block` の span）で中身を包むようにした。これまでは中身の要素それぞれにスタイルを配っていたため、次のことが起きていた
  - Unicode 絵文字・カスタム絵文字・メンションなど、スタイルを受け取らない中身には効かなかった（`$[spin 🍮]` が回らない、`$[fg.color=f00 #tag]` に色が付かないなど）
  - 中身が複数あると、それぞれが別々に回ったり、別々に枠が付いたりした
  - `$[rotate $[flip ...]]` のように入れ子にすると、内側の transform が外側のものを上書きしていた
- `$[x3]` を 400%、`$[x4]` を 600% にした（これまでは 300%・400%）。入れ子にすると、Misskey と同じく 2 重目は半分だけ効き、3 重目からは効かない
- アニメーションの既定値を Misskey に合わせた
  - `$[tada]`: 文字を 150% にする
  - `$[twitch]`: 0.5 秒、ease（これまでは 1 秒、linear）
  - `$[rainbow]`: 1 秒、linear（これまでは 0.5 秒、ease）
- `$[ruby **太字** ふとじ]` のように本文がテキストでないとき、何も表示されなかったのを直した。`$[ruby 漢字 かんじ]` の本文の後ろに余分な空白が入っていたのも直した
- `$[font 文字]` のようにフォントを指定しないときは、Misskey と同じく `$[font 文字]` のまま表示する（これまでは sans-serif にしていた）
- 高度な MFM を止めたときの `$[position]` は、Misskey と同じく `$[position 文字]` のまま表示する
- `$[border.style=...]` は、Misskey と同じく小文字で書いたものだけを受け付ける（`SOLID` は既定の solid になる）
- `<i>` の斜体を、Misskey と同じく `font-style: oblique` にした。`<plain>` の中身を span で包むようにした

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
