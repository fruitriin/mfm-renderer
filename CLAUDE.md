# MFM Renderer プロジェクト - AI アシスタント向けガイド

## 言語設定

**このプロジェクトでは、Claude は基本的に日本語で返答してください。**

すべてのコメント、説明、コミットメッセージ、PRの説明などは日本語で記述してください。ただし、コード自体（変数名、関数名、コメントなど）は既存のコーディング規約に従ってください。

## プロジェクト概要

**Meintenable MFM Renderer Component** は、MFM (Misskey Flavored Markdown) をレンダリングする Vue 3 コンポーネントライブラリです。

### コードの起源と設計思想

このプロジェクトは **[Misskey](https://github.com/misskey-dev/misskey) プロジェクトの [`MkMfm.ts`](https://github.com/misskey-dev/misskey/blob/develop/packages/frontend/src/components/global/MkMfm.ts) を元にしています**。

オリジナルの実装は TSX (TypeScript + JSX) で書かれた単一の大きなコンポーネントでしたが、このプロジェクトでは以下の方針で再構築されています:

- **TSX から Vue SFC (Single File Component) への変換**: TypeScript + JSX の形式から、Vue の `.vue` ファイル形式に変換
- **各 MFM 文法ごとにコンポーネントを分割**: メンテナンス性向上のため、各構文要素を独立したコンポーネントとして実装
- **保守性重視**: モノリシックな実装から、機能ごとに分離された構造へ

この設計により、個々の MFM 構文の実装や修正が容易になり、コードの理解も簡単になっています。

## 技術スタック

- **フレームワーク**: Vue 3 (Composition API)
- **言語**: TypeScript
- **ビルドツール**: Vite
- **パーサー**: mfm-js (v0.24.0)
- **スタイリング**: CSS (scoped styles in Vue components)
- **コード品質**: ESLint, Prettier

## プロジェクト構造

```
mfm-renderer/
├── src/
│   ├── components/
│   │   ├── MfmComponents/        # 各 MFM 構文のコンポーネント
│   │   │   ├── Bold.vue          # 太字
│   │   │   ├── Italic.vue        # 斜体
│   │   │   ├── Strike.vue        # 打ち消し線
│   │   │   ├── InlineCode.vue    # インラインコード
│   │   │   ├── BlockCode.vue     # ブロックコード
│   │   │   ├── Center.vue        # 中央寄せ
│   │   │   ├── Quote.vue         # 引用
│   │   │   ├── Search.vue        # 検索
│   │   │   ├── Link.vue          # リンク
│   │   │   ├── Url.vue           # URL
│   │   │   ├── Mention.vue       # メンション
│   │   │   ├── Hashtag.vue       # ハッシュタグ
│   │   │   ├── EmojiCode.vue     # カスタム絵文字
│   │   │   ├── UnicodeEmoji.vue  # Unicode絵文字
│   │   │   ├── Small.vue         # 小さい文字
│   │   │   ├── Plain.vue         # プレーン
│   │   │   ├── Text.vue          # テキスト
│   │   │   ├── Fn.vue            # 関数構文 ($[...])
│   │   │   └── Fn/               # Fn 関数のサブコンポーネント
│   │   │       ├── Fg.vue        # 文字色
│   │   │       ├── Bg.vue        # 背景色
│   │   │       ├── Blur.vue      # ぼかし
│   │   │       ├── Font.vue      # フォント
│   │   │       ├── Rotate.vue    # 回転
│   │   │       ├── Scale.vue     # 拡大縮小
│   │   │       ├── Position.vue  # 位置
│   │   │       ├── Flip.vue      # 反転
│   │   │       ├── X2.vue, X3.vue, X4.vue  # サイズ
│   │   │       ├── Spin.vue      # 回転アニメーション
│   │   │       ├── Jump.vue      # ジャンプ
│   │   │       ├── Bounce.vue    # バウンス
│   │   │       ├── Shake.vue     # シェイク
│   │   │       ├── Twitch.vue    # トゥイッチ
│   │   │       ├── Tada.vue      # タダー
│   │   │       ├── Jelly.vue     # ゼリー
│   │   │       ├── Rainbow.vue   # レインボー
│   │   │       └── Ruby.vue      # ルビ
│   │   ├── Mfm.vue               # メインコンポーネント
│   │   ├── MfmAst.vue            # AST レンダラー
│   │   └── MfmRenderer.vue       # レンダラーコンポーネント
│   ├── utils/
│   │   └── mfmUtil.ts            # ユーティリティ関数
│   ├── library.ts                # ライブラリエントリーポイント
│   └── main.ts                   # 開発用エントリーポイント
├── dist/                         # ビルド出力
├── package.json
├── tsconfig.json
├── vite.config.ts                # ライブラリビルド設定
└── vite.config.docs.ts           # ドキュメントビルド設定
```

## 開発ワークフロー

### セットアップ

```bash
npm install
```

### 開発サーバー起動

```bash
npm run dev
```

### ビルド

```bash
npm run build        # ライブラリとして UMD + ES Module 形式でビルド
npm run pages        # GitHub Pages 用にビルド
```

### コード整形

```bash
npm run lint         # ESLint で自動修正
npm run format       # Prettier で整形
```

## コーディング規約

### TypeScript

- 型定義を明示的に記述
- `any` 型の使用は最小限に
- インターフェースとタイプエイリアスを適切に使い分け

### Vue コンポーネント

- Composition API を使用
- `<script setup>` 構文を推奨
- Props と Emits の型を明示的に定義
- スタイルは `<style scoped>` を使用

### ファイル命名規則

- Vue コンポーネント: PascalCase (例: `Bold.vue`, `EmojiCode.vue`)
- TypeScript ファイル: camelCase (例: `mfmUtil.ts`)
- 定数ファイル: camelCase

## MFM コンポーネント実装ガイドライン

### 新しい MFM 構文コンポーネントを追加する場合

1. **コンポーネント作成**: `src/components/MfmComponents/` に新しい `.vue` ファイルを作成
2. **Props 定義**: 必要な Props (特に `token` や `mfmOptions`) を定義
3. **レンダリングロジック**: Misskey の元実装を参照しつつ、Vue SFC として再実装
4. **MfmAst.vue への登録**: `MfmAst.vue` の switch 文に新しい case を追加
5. **スタイリング**: 必要に応じて scoped style を追加

### 既存コンポーネントを修正する場合

1. **元実装を確認**: Misskey の `MkMfm.ts` で対応する部分を確認
2. **変更の影響範囲を確認**: 他のコンポーネントへの影響を検討
3. **スタイルの一貫性**: 既存のコンポーネントとスタイルを統一

### Fn コンポーネント (`$[...]` 構文)

- `Fn.vue` が親コンポーネント
- 各関数 (`fg`, `bg`, `spin` など) は `Fn/` ディレクトリ内に独立したコンポーネントとして実装
- 新しい関数を追加する場合は、`Fn.vue` の switch 文に case を追加

## 未実装機能と改善が必要な箇所

### スタイルが不足しているコンポーネント

- `BlockCode.vue`: コードブロックのスタイルが未実装
- `InlineCode.vue`: インラインコードのスタイルが未実装

### 未実装の Fn 機能

- `sparkle`: キラキラエフェクト
- `unixtime`: Unix タイムスタンプから相対時間表示

### アニメーション関連

- ほとんどのアニメーションは実装済み
- `delay` パラメータが未対応

### Unicode Emoji

- 現在は暫定的な実装 (改善の余地あり)

## 変更を加える際のチェックリスト

- [ ] 元の Misskey 実装と動作が一致しているか
- [ ] TypeScript の型エラーがないか (`npm run build` で確認)
- [ ] ESLint のエラーがないか (`npm run lint`)
- [ ] Vue の警告が出ていないか
- [ ] 既存のコンポーネントとの一貫性が保たれているか
- [ ] スコープ付きスタイルを使用しているか
- [ ] Props の型定義が明示的か
- [ ] 必要に応じてコメントを追加したか

## その他の重要な情報

### ライブラリとしての使用方法

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import Mfm from "mfm-renderer"

createApp(App).use(Mfm).mount('#app')
```

コンポーネント内での使用:

```vue
<MfmText text="Hello **mfm**" />
```

### パーサー

このプロジェクトは MFM のパース処理に `mfm-js` ライブラリを使用しています。AST (Abstract Syntax Tree) を生成し、それを各 Vue コンポーネントでレンダリングする構造です。

### 開発時の注意点

- 開発時は `npm run dev` でホットリロード環境が使える
- ライブラリとしてビルドする前に必ず `npm run build` で型チェックを実行
- デプロイ用のドキュメントは `npm run pages` でビルド
