# Meintenable MFM Renderer Component

MFMをレンダリングするコンポーネント
各文法ごとにコンポーネント化されているのでメンテナンスしやすい気がする。


## Installation

npm から入れるか、GitHub のタグを指定して入れる。GitHub から入れたときは、インストール時に `prepare` でビルドされる。

```
npm install mfm-renderer
npm install github:fruitriin/mfm-renderer#v0.2.1
```

main.js (main.ts) 的なところで createApp() しているところに .use(Mfm) を足す

```
import { createApp } from 'vue'
import App from './App.vue'

import Mfm from "mfm-renderer"
import "mfm-renderer/style.css"

createApp(App).use(Mfm).mount('#app')
```

`vue` は peerDependencies なので、利用側で入れておく。

`.use(Mfm)` でグローバル登録されるのは、`MfmRenderer`・`MfmComponent` と、構文ごとのコンポーネント（`MfmBold`・`MfmFg` など、`Mfm` 接頭辞付き）である。v0.2.0 までは `Bold`・`Link` のように接頭辞なしで登録していた。

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

にゃー化には `misskey-js` の `nyaize` を使い、必要になったときだけ読み込む。読み込めない環境（UMD を script タグで使う場合など）では、にゃー化しない。

- `$[clickable.ev=名前 ...]` が押されると、`clickEv` イベントで `名前` を渡す
- メンションのアバターとカスタム絵文字は、`provide('domain', 'misskey.io')` と `provide('emojis', { 名前: { url } })` で渡す（ref や computed でもよい）。`domain` がないときは、アバターを取りに行かない
- コードブロックのハイライトには `shiki` を使う。読み込めない環境（UMD を script タグで使う場合など）では、ハイライトせずに表示する
- 色は Misskey のテーマと同じ CSS 変数（`--MI_THEME-fg`・`--MI_THEME-accent`・`--MI_THEME-divider`・`--MI_THEME-mention`・`--MI_THEME-hashtag`）を使う。なければ 2024.10 より前の名前（`--fg` など）を使う

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

