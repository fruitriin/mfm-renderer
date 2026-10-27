# Meintenable MFM Renderer Component

MFMをレンダリングするコンポーネント
各文法ごとにコンポーネント化されているのでメンテナンスしやすい気がする。

Vue 3 と React（18・19）で使える。React 版は `mfm-renderer/react` から読み込む（[React で使う](#react-で使う)）。

プレビュー: [Vue 版](https://fruitriin.github.io/mfm-renderer/)・[React 版](https://fruitriin.github.io/mfm-renderer/react.html)・[Vue と React を比べる](https://fruitriin.github.io/mfm-renderer/compare.html)


## Installation

npm から入れるか、GitHub のタグを指定して入れる。GitHub から入れたときは、インストール時に `prepare` でビルドされる。v0.3.0 より後の版を GitHub から入れるには、ビルドに使う Vite 8 のために Node.js 20.19 以降が要る。

```
npm install mfm-renderer
npm install github:fruitriin/mfm-renderer#v0.4.0
```

main.js (main.ts) 的なところで createApp() しているところに .use(Mfm) を足す

```
import { createApp } from 'vue'
import App from './App.vue'

import Mfm from "mfm-renderer"
import "mfm-renderer/style.css"

createApp(App).use(Mfm).mount('#app')
```

`vue` は peerDependencies なので、利用側で入れておく。React 版だけを使うときは `vue` は要らない。

## 版ごとの使い方

`.use(Mfm)` でグローバル登録されるコンポーネントの名前が、v0.3.0 で変わった。`MfmRenderer` だけを使うなら、どちらの版でも書き方は同じである。

| | v0.3.0 以降 | v0.2.x |
|---|---|---|
| 文字列の MFM を描画する | `MfmRenderer` | `MfmRenderer` |
| 解析済みの AST を描画する | `MfmComponent` | `MfmComponent` |
| 構文ごとのコンポーネント | `MfmBold`・`MfmLink`・`MfmFg` など（`Mfm` 接頭辞付き） | `Bold`・`Link`・`Fg` など（接頭辞なし） |

### v0.3.0 以降

```
npm install github:fruitriin/mfm-renderer#v0.4.0
```

```vue
<script setup lang="ts">
import { parse } from 'mfm-js'

const tokens = parse('**太字** と $[x2 大きい文字]')
</script>

<template>
  <!-- ふつうはこれだけでよい -->
  <MfmRenderer text="Hello **mfm**" />

  <!-- 解析済みの AST を描画する -->
  <MfmComponent :tokens="tokens" />

  <!-- 構文ごとのコンポーネントを直接使う。名前には Mfm 接頭辞が付く -->
  <MfmBold :children="tokens[0].children" />
</template>
```

構文ごとのコンポーネントに接頭辞が付いたので、利用側の `Link` や `Search` などのコンポーネントと名前が衝突しない。

### v0.2.x

```
npm install github:fruitriin/mfm-renderer#v0.2.1
```

```vue
<template>
  <MfmRenderer text="Hello **mfm**" />
  <MfmComponent :tokens="tokens" />

  <!-- 構文ごとのコンポーネントは接頭辞なし -->
  <Bold :children="tokens[0].children" />
</template>
```

v0.2.x では構文ごとのコンポーネントを `Bold`・`Link`・`Search` などの名前でグローバル登録する。利用側が同じ名前のコンポーネントを登録すると、登録した順番によってどちらかが上書きされる。

後述の `MfmRenderer` の props のうち `text` 以外（`nyaize`・`advancedMfm` など）は、v0.2.1 で追加した。v0.2.0 では使えない。

### v0.2.x から v0.3.0 に上げるとき

- `MfmRenderer` と `MfmComponent` だけを使っているなら、書き換えは要らない
- 構文ごとのコンポーネントを名前で使っているなら、名前の頭に `Mfm` を付ける（`<Bold>` → `<MfmBold>`、`<X2>` → `<MfmX2>`）
- 名前の衝突を避けるために、利用側のコンポーネントの名前を変えていた場合は、元に戻してよい

## 使い方

コンポーネントの中で MfmRenderer コンポーネントを使う

```
<MfmRenderer text="Hello **mfm**" @click-ev="(ev) => console.log(ev)" />
```

`MfmRenderer` は、Misskey の MFM コンポーネントと同じ次の props を受け取る。

| props | 既定値 | せつめい |
|---|---|---|
| `text` | （必須） | 描画する MFM |
| `plain` | `false` | テキスト・絵文字・プレーンだけを解析し、改行を空白にする。絵文字は文字の大きさに合わせる（ユーザー名など向け） |
| `nowrap` | `false` | 1 行に収め、はみ出たら省略する |
| `rootScale` | `1` | 文字の倍率の初期値。x2〜x4 と scale で掛け合わされ、2.5 以上になったカスタム絵文字には `original-size` クラスが付く |
| `nyaize` | `false` | `'respect'` のとき、`author.isCat` が true ならにゃー化する（Misskey と同じく、`true` ではにゃー化しない）。引用とリンクの中はにゃー化しない |
| `author` | `null` | 投稿者。今は `isCat` だけを使う |
| `advancedMfm` | `true` | false のときは x2〜x4・position・scale を効かせず、アニメーションも止める |
| `animatedMfm` | `true` | false のときはアニメーションを止める。rainbow は静的な虹色、sparkle は中身だけで表示する |
| `emojiStyle` | `'native'` | Unicode の絵文字の描き方。`'twemoji'` にすると Twemoji の画像で、Misskey の既定の見た目（高さ 1.25em）になる。カスタム絵文字（高さ 2em）との大きさの差も Misskey と同じになる |
| `twemojiBase` | jsDelivr の `@discordapp/twemoji@16.0.1/dist/svg` | Twemoji の SVG を置いている場所。自分のサーバーに置くときに変える |

にゃー化には `misskey-js` の `nyaize` を使い、必要になったときだけ読み込む。読み込めない環境（UMD を script タグで使う場合など）では、にゃー化しない。

- `$[clickable.ev=名前 ...]` が押されると、`clickEv` イベントで `名前` を渡す
- メンションのアバターとカスタム絵文字は、`provide('domain', 'misskey.io')` と `provide('emojis', { 名前: { url } })` で渡す（ref や computed でもよい）。`domain` がないときは、アバターを取りに行かない
- コードブロックのハイライトには `shiki` を使う。読み込めない環境（UMD を script タグで使う場合など）では、ハイライトせずに表示する
- 色は Misskey のテーマと同じ CSS 変数（`--MI_THEME-fg`・`--MI_THEME-accent`・`--MI_THEME-divider`・`--MI_THEME-mention`・`--MI_THEME-hashtag`）を使う。なければ 2024.10 より前の名前（`--fg` など）を使う

## React で使う

`react` と `react-dom` を入れておく（18 か 19）。`vue` は要らない。

```
npm install github:fruitriin/mfm-renderer#v0.4.0 react react-dom
```

```tsx
import { MfmRenderer } from 'mfm-renderer/react'
import 'mfm-renderer/react/style.css'

const emojis = { blobcat: { url: 'https://example.com/blobcat.png' } }

export function Note({ text }: { text: string }) {
  return <MfmRenderer text={text} domain="misskey.io" emojis={emojis} onClickEv={(ev) => console.log(ev)} />
}
```

- Vue 版の `.use()` のようなグローバル登録はしない。使う場所で import する
- `mfm-renderer/react` は ES Modules だけで配布する（`require` では読み込めない）。UMD 版もない
- サーバー側で描画（SSR）しても使える。ただし `$[unixtime]` の表示は描画した時点の時計とロケールで決まるので、サーバーとブラウザで食い違うことがある。ハイドレーションの不一致の警告は出さない
- props は Vue 版の `MfmRenderer` と同じ（`plain`・`nowrap`・`rootScale`・`nyaize`・`author`・`advancedMfm`・`animatedMfm`・`emojiStyle`・`twemojiBase`）。Vue 版の `@click-ev` は `onClickEv` になる
- `domain` と `emojis` は props で渡す。Vue 版の `provide('domain')`・`provide('emojis')` に当たる
- たくさんの投稿で同じものを使うときは、`MfmProvider` で外側から一度だけ渡せる。`MfmRenderer` の props で渡したものが優先される

```tsx
import { MfmProvider, MfmRenderer } from 'mfm-renderer/react'

<MfmProvider domain="misskey.io" emojis={emojis}>
  {notes.map((note) => <MfmRenderer key={note.id} text={note.text} />)}
</MfmProvider>
```

- 構文ごとのコンポーネントは `components` で差し替えられる。キーは接頭辞なしの名前（`Link`・`Mention`・`X2` など）である。`$[foo ...]` のように、新しい関数を足すこともできる

```tsx
import type { MfmLink } from 'mfm-js'
import type { MfmSyntaxProps } from 'mfm-renderer/react'

function MyLink({ token }: MfmSyntaxProps<MfmLink['props']>) {
  return <a href={token?.url} target="_blank" rel="noopener noreferrer">{token?.url}</a>
}

<MfmRenderer text={text} components={{ Link: MyLink }} />
```

- `components`・`emojis` をインラインのオブジェクトで書くと、描画のたびに作り直され、中身がすべて描画し直される。たくさんの投稿に使うときは、モジュールに置くか `useMemo` で作って渡す

- 差し替えるコンポーネントには、位置（何番目のノードか）を key にして描画する。state を持つコンポーネントは、`text` が変わると前の入力の state が残ることがあるので、`token` の値から作った key で state を作り直す
- `MfmSyntaxProps` の `token` の型は、指定しないと `any` になる。構文ごとに型が違うためである。上の例のように mfm-js の型（`MfmLink['props']` など）を指定すると型が付く

- 構文ごとのコンポーネントや、解析済みの AST を描画する `MfmComponent` も import できる（`MfmBold`・`MfmX2` など、Vue 版の登録名と同じ）

## 進み具合

### 構文 (Syntax)

| ファイル名            | 説明      | 進捗                        |
|------------------|---------|---------------------------|
| Blockcode.vue    | 複数行のコード | ✅ Shiki でハイライト            |
| Bold.vue         | 太字      | ✅ 完成                     |
| EmojiCode.vue    | カスタム絵文字 | ✅ 完成                     |
| InlineCode.vue   | 一行のコード  | ✅ 完成                     |
| Mention.vue      | メンション   | 🟡 動作OK（最適化の余地あり）        |
| Search.vue       | 検索      | ✅ 完成                     |
| Text.vue         | テキスト    | ✅ 完成                     |
| Center.vue       | 中央寄せ    | ✅ 完成                     |
| Fn.vue           | なんか色々   | 🟡 後述                     |
| Italic.vue       | 斜体      | ✅ 完成                     |
| Plain.vue        | プレーン    | ✅ 完成                     |
| Small.vue        | 小文字     | ✅ 完成                     |
| UnicodeEmoji.vue | Unicode絵文字 | 🟡 暫定実装（Twemoji等への置き換え推奨） |
| Hashtag.vue      | ハッシュタグ  | ✅ 完成                     |
| Link.vue         | リンク構文   | 🟡 動作OK（silentオプション未実装）  |
| Quote.vue        | 引用      | ✅ 完成                     |
| Strike.vue       | 打ち消し線   | ✅ 完成                     |
| Url.vue          | URL     | ✅ 完成                     |


### Fn

`$[nantoka text]` のやつ

#### 色・スタイル

| コンポーネント | せつめい        | 進み具合                         |
|---------|-------------|------------------------------|
| fg      | 文字色         | ✅ 完成                         |
| bg      | 背景色         | ✅ 完成                         |
| blur    | ぼかし         | ✅ 完成                         |
| font    | フォント        | ✅ 完成                         |
| border  | ボーダー        | ✅ 完成                         |

#### 変形

| コンポーネント | せつめい | 進み具合                              |
|---------|------|-----------------------------------|
| rotate  | 回転   | ✅ 完成                              |
| scale   | 拡大縮小 | ✅ 完成                              |
| position | 位置調整 | ✅ 完成                              |
| flip    | 反転   | ✅ 完成                              |
| x2      | 2倍   | ✅ 完成                              |
| x3      | 3倍   | ✅ 完成                              |
| x4      | 4倍   | ✅ 完成                              |

#### アニメーション

| コンポーネント | せつめい   | 進み具合                                   |
|---------|--------|----------------------------------------|
| spin    | 回転     | ✅ speed, delay, x/y, left/alternate対応済み |
| jump    | ジャンプ   | ✅ speed, delay対応済み                     |
| bounce  | バウンス   | ✅ speed, delay対応済み                     |
| shake   | シェイク   | ✅ speed, delay対応済み                     |
| twitch  | けいれん   | ✅ speed, delay対応済み                     |
| tada    | タダー    | ✅ speed, delay対応済み                     |
| jelly   | ゼリー    | ✅ speed, delay対応済み                     |
| rainbow | レインボー  | ✅ speed, delay対応済み                     |
| sparkle | キラキラ   | ✅ speed, delay対応済み（独自実装）              |

#### その他

| コンポーネント | せつめい     | 進み具合  |
|---------|----------|-------|
| ruby    | ルビ（ふりがな） | ✅ 完成  |
| unixtime | 日時と相対時間 | ✅ 完成 |
| clickable | クリックイベント | ✅ 完成（`clickEv` イベント） |

### 今後の改善候補

- Mention.vue の最適化（デバウンス/キャッシュ）
- Unicode 絵文字の置き換え（Twemoji 等）
- Link.vue の silent オプション実装

