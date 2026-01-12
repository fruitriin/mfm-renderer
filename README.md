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
| blur    | ぼかし         | ❌ バグあり（不要なfontFamilyプロパティ） |
| font    | フォント        | ❌ 致命的なバグ（Object.keys()の誤用）  |
| border  | ボーダー        | ❌ 未実装                        |

#### 変形

| コンポーネント | せつめい | 進み具合                              |
|---------|------|-----------------------------------|
| rotate  | 回転   | ❌ バグあり（token.deg → token.args.deg） |
| scale   | 拡大縮小 | ❌ バグあり（classNameミス、最大値制限なし）     |
| position | 位置調整 | ✅ 完成                              |
| flip    | 反転   | ❌ ロジックバグ（反転方向が逆）                 |
| x2      | 2倍   | ✅ 完成                              |
| x3      | 3倍   | ✅ 完成                              |
| x4      | 4倍   | ✅ 完成                              |

#### アニメーション

| コンポーネント | せつめい   | 進み具合                              |
|---------|--------|-----------------------------------|
| spin    | 回転     | ⚠️ speedのみ対応（delay、axis、direction未対応） |
| jump    | ジャンプ   | ⚠️ speedのみ対応（delay未対応）             |
| bounce  | バウンス   | ⚠️ speedのみ対応（delay未対応）             |
| shake   | シェイク   | ⚠️ speedのみ対応（delay未対応）             |
| twitch  | けいれん   | ⚠️ speedのみ対応（delay未対応）             |
| tada    | タダー    | ⚠️ speedのみ対応（delay未対応）             |
| jelly   | ゼリー    | ⚠️ speedのみ対応（delay未対応）             |
| rainbow | レインボー  | ⚠️ speedのみ対応（delay未対応）             |
| sparkle | キラキラ   | 🟡 独自実装（本家とは異なるシンプル版）            |

#### その他

| コンポーネント | せつめい     | 進み具合  |
|---------|----------|-------|
| ruby    | ルビ（ふりがな） | ✅ 完成  |
| unixtime | 相対時間表示   | ❌ 未実装 |
| clickable | クリックイベント | ❌ 未実装 |

### 優先度別の改善提案

#### 🔴 最優先（致命的なバグ）

1. Font.vueのバグ修正 - `Object.keys()`を適切なフォント選択に修正
2. Rotate.vueのパラメータ参照修正 - `token.deg` → `token.args.deg`
3. Blur.vueの不要なfontFamily削除
4. Flip.vueのロジック修正 - 反転の動作を正しく
5. Scale.vueのclassName修正と最大値制限追加

#### 🟠 高優先度（重要な機能の欠如）

6. Border機能の実装
7. Clickable機能の実装
8. Unixtime機能の実装
9. Spin.vueのaxis/direction対応
10. 全アニメーションのdelay対応（9コンポーネント）

#### 🟡 中優先度（改善）

11. コードスタイルの改善（InlineCode.vue、BlockCode.vue）
12. シンタックスハイライトの実装（BlockCode.vue）
13. Mention.vueの最適化（デバウンス/キャッシュ）
14. Unicode絵文字の置き換え（Twemoji等）
15. Link.vueのsilentオプション実装 

