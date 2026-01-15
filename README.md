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

| ファイル名            | 説明      | 進捗                        |
|------------------|---------|---------------------------|
| Blockcode.vue    | 複数行のコード | ⚠️ スタイルがない、シンタックスハイライト未実装 |
| Bold.vue         | 太字      | ✅ 完成                     |
| EmojiCode.vue    | カスタム絵文字 | ✅ 完成                     |
| InlineCode.vue   | 一行のコード  | ⚠️ スタイルがない               |
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
| blur    | ぼかし         | ✅ 完成（#39で修正済み）                         |
| font    | フォント        | ✅ 完成（#40で修正済み）  |
| border  | ボーダー        | ✅ 完成（#37で実装済み）                         |

#### 変形

| コンポーネント | せつめい | 進み具合                              |
|---------|------|-----------------------------------|
| rotate  | 回転   | ✅ 完成（#39で修正済み） |
| scale   | 拡大縮小 | ✅ 完成（#41で修正済み）     |
| position | 位置調整 | ✅ 完成                              |
| flip    | 反転   | ❌ ロジックバグ（反転方向が逆）                 |
| x2      | 2倍   | ✅ 完成                              |
| x3      | 3倍   | ✅ 完成                              |
| x4      | 4倍   | ✅ 完成                              |

#### アニメーション

| コンポーネント | せつめい   | 進み具合                                   |
|---------|--------|----------------------------------------|
| spin    | 回転     | ⚠️ speed, delay対応済み（#33）、axis・direction未対応 |
| jump    | ジャンプ   | ✅ speed, delay対応済み（#33）                     |
| bounce  | バウンス   | ✅ speed, delay対応済み（#33）                     |
| shake   | シェイク   | ✅ speed, delay対応済み（#33）                     |
| twitch  | けいれん   | ✅ speed, delay対応済み（#33）                     |
| tada    | タダー    | ✅ speed, delay対応済み（#33）                     |
| jelly   | ゼリー    | ✅ speed, delay対応済み（#33）                     |
| rainbow | レインボー  | ✅ speed, delay対応済み（#33）                     |
| sparkle | キラキラ   | ✅ speed, delay対応済み（#33、独自実装）              |

#### その他

| コンポーネント | せつめい     | 進み具合  |
|---------|----------|-------|
| ruby    | ルビ（ふりがな） | ✅ 完成  |
| unixtime | 相対時間表示   | ❌ 未実装 |
| clickable | クリックイベント | ❌ 未実装 |

### 優先度別の改善提案

#### 🔴 最優先（致命的なバグ）

1. ✅ ~~Font.vueのバグ修正~~ - #40で修正済み
2. ✅ ~~Rotate.vueのパラメータ参照修正~~ - #39で修正済み
3. ✅ ~~Blur.vueの不要なfontFamily削除~~ - #39で修正済み
4. ❌ **Flip.vueのロジック修正** - 反転の動作を正しく（#25は未対応）
5. ✅ ~~Scale.vueのclassName修正と最大値制限追加~~ - #41で修正済み

#### 🟠 高優先度（重要な機能の欠如）

6. ❌ **Clickable機能の実装** - #29で追跡中
7. ❌ **Unixtime機能の実装** - #27で追跡中
8. ❌ **Spin.vueのaxis/direction対応** - #30で追跡中
9. ✅ ~~全アニメーションのdelay対応~~ - #33で完了
10. ✅ ~~Border機能の実装~~ - #37で完了

#### 🟡 中優先度（改善）

11. ❌ **コードスタイルの改善**（InlineCode.vue、BlockCode.vue） - #31で追跡中
12. シンタックスハイライトの実装（BlockCode.vue）
13. Mention.vueの最適化（デバウンス/キャッシュ）
14. Unicode絵文字の置き換え（Twemoji等）
15. Link.vueのsilentオプション実装 

