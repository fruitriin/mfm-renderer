# Meintenable MFM Renderer Component

MFMをレンダリングするコンポーネント
各文法ごとにコンポーネント化されているのでメンテナンスしやすい気がする。

## Installation

main.js (main.ts) 的なところで createApp() しているところに .use(Mfm) を足す

```
import { createApp } from 'vue'
import App from './App.vue'

import Mfm from "mfm-renderer"

createApp(App).use(Mfm).mount('#app')
```


## 使い方

コンポーネントの中で MfmText コンポーネントを使う

```
<MfmText text="Hello **mfm**" />
```

## 進み具合

### 構文 (Syntax)

| ファイル名            | 説明      | 進捗       |
|------------------|---------|----------|
| Blockcode.vue    | 複数行のコード | スタイルがない  |
| Bold.vue         | 太字      | よさそう     |
| EmojiCode.vue    | カスタム絵文字 | よさそう     |
| Inlinecode.vue   | 一行のコード  | スタイルがない  |
| Mention.vue      | メンション   | よさそう     |
| Search.vue       | 検索      | よさそう     |
| Text.vue         | テキスト    | よさそう     |
| Center.vue       | 中央寄せ    | よさそう     |
| Fn.vue           | なんか色々   | 後述       |
| Italic.vue       | 斜体      | よさそう     |
| Plain.vue        |         | よさそう     |
| Small.vue        |         | よさそう     |
| UnicodeEmoji.vue |         | 暫定       |
| Hashtag.vue      | ハッシュタグ  | よさそう     |
| Link.vue         | リンク構文   | よさそう     |
| Quote.vue        | 引用      | よさそう     |
| Strike.vue       | 打ち消し線   | よさそう     |
| Url.vue          | URL     | よさそう     |


### Fn

`$[nantoka text]` のやつ

| コンポーネント   | せつめい        | 進み具合         |
|-----------|-------------|--------------|
| fg        | 文字色         | よさそう         |
| bg        | 背景          | よさそう         |
| blur      | 文字色         | よさそう         |
| font      | font-family | よさそう         |
| rotate    | 回転          | よさそう         |
| scale     | 拡大          | よさそう         |
| position  | 位置変更        | よさそう         |
| （アニメーション) |             | delay 以外よさそう |
| sparkle   | きらきら        | 未実装          |
| unixtime  | 相対時間        | 未実装          | 

