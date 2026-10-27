# Meintenable MFM Renderer Component

MFMをレンダリングするコンポーネント
各文法ごとにコンポーネント化されているのでメンテナンスしやすい気がする。


## Installation

npm から入れるか、GitHub のタグを指定して入れる。GitHub から入れたときは、インストール時に `prepare` でビルドされる。

```
npm install mfm-renderer
npm install github:fruitriin/mfm-renderer#v0.2.0
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

## 使い方

コンポーネントの中で MfmRenderer コンポーネントを使う

```
<MfmRenderer text="Hello **mfm**" @click-ev="(ev) => console.log(ev)" />
```

- `$[clickable.ev=名前 ...]` が押されると、`clickEv` イベントで `名前` を渡す
- メンションのアバターとカスタム絵文字は、`provide('domain', 'misskey.io')` と `provide('emojis', { 名前: { url } })` で渡す（ref や computed でもよい）。`domain` がないときは、アバターを取りに行かない
- コードブロックのハイライトには `shiki` を使う。読み込めない環境（UMD を script タグで使う場合など）では、ハイライトせずに表示する

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

