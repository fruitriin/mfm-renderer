# CLAUDE.md - MFM Renderer Project Guidelines

このドキュメントは、AI アシスタント（Claude など）がこのリポジトリで作業する際のガイドラインを提供します。

## プロジェクト概要

**mfm-renderer** は、MFM（Misskey Flavored Markdown）をレンダリングするための Vue 3 コンポーネントライブラリです。

### 主な特徴
- 各 MFM 文法ごとにコンポーネント化されており、メンテナンスしやすい設計
- Vue 3 と TypeScript で構築
- mfm-js ライブラリを使用して MFM をパース
- Vite によるビルド

## 技術スタック

- **フレームワーク**: Vue 3
- **言語**: TypeScript（strict モード）
- **ビルドツール**: Vite
- **パッケージマネージャー**: npm
- **MFM パーサー**: mfm-js (v0.24.0)
- **コード品質**: ESLint + Prettier

## プロジェクト構造

```
src/
├── components/
│   ├── MfmRenderer.vue          # メインのレンダラーコンポーネント
│   ├── MfmAst.vue               # AST ベースのレンダリング
│   └── MfmComponents/           # 各 MFM 文法のコンポーネント
│       ├── Bold.vue
│       ├── Italic.vue
│       ├── Center.vue
│       ├── Link.vue
│       ├── Mention.vue
│       ├── Fn.vue               # $[function text] 構文
│       ├── Fn/                  # Fn のサブコンポーネント
│       │   ├── Flip.vue
│       │   ├── Spin.vue
│       │   ├── Scale.vue
│       │   └── ...
│       └── ...
├── utils/
│   └── mfmUtil.ts               # ユーティリティ関数
└── library.ts                   # ライブラリのエントリーポイント
```

## 開発ワークフロー

### セットアップ
```bash
npm install
```

### 開発サーバーの起動
```bash
npm run dev
```

### ビルド
```bash
npm run build
```

### コードフォーマット
```bash
npm run format  # Prettier でフォーマット
npm run lint    # ESLint でリント（自動修正付き）
```

### 型チェック
ビルドコマンドに含まれています:
```bash
vue-tsc --emitDeclarationOnly
```

## コーディング規約

### TypeScript
- **strict モード**: 有効
- **未使用変数/パラメータ**: エラーとして扱う（`noUnusedLocals`, `noUnusedParameters`）
- **型定義**: すべてのコンポーネントとユーティリティ関数に適切な型を付ける

### Vue コンポーネント
- **Composition API** を使用（`<script setup>` を推奨）
- **Props**: 適切な型定義と必要に応じてデフォルト値を設定
- **Emits**: 明示的に定義
- **単一ファイルコンポーネント**: テンプレート、スクリプト、スタイルを 1 つのファイルにまとめる

### ファイル命名規則
- **Vue コンポーネント**: PascalCase（例: `Bold.vue`, `EmojiCode.vue`）
- **TypeScript ファイル**: camelCase（例: `mfmUtil.ts`）
- **ディレクトリ**: PascalCase（例: `MfmComponents/`, `Fn/`）

### スタイル
- コンポーネント固有のスタイルは `<style scoped>` を使用
- グローバルスタイルが必要な場合は明確にコメントする

## MFM コンポーネントの実装ガイドライン

### 新しい MFM コンポーネントを追加する場合

1. **コンポーネントの配置**
   - 基本的な構文: `src/components/MfmComponents/`
   - Fn のサブ機能: `src/components/MfmComponents/Fn/`

2. **Props の定義**
   ```typescript
   interface Props {
     node: MfmNode;  // mfm-js の Node 型
     // 必要に応じて追加のプロパティ
   }
   ```

3. **再帰的なレンダリング**
   - 子ノードがある場合は、`MfmRenderer` または `MfmAst` コンポーネントを使用して再帰的にレンダリング

4. **進捗管理**
   - README.md の進捗表を更新する
   - 実装が完了したら「よさそう」、スタイルが未完成なら「スタイルがない」など、適切なステータスを記載

### 既存のコンポーネントを修正する場合

- 他の類似コンポーネントとの一貫性を保つ
- スタイルの変更は全体的な見た目に影響するため慎重に行う
- mfm-js のバージョンアップ時は、API の変更に注意

## テスト

現在、テストフレームワーク（Vitest）はセットアップされていますが、テストファイルの実装が必要です。

### テストを追加する場合
- Vitest を使用
- ファイル名: `*.test.ts` または `*.spec.ts`
- コンポーネントのテストは `@vue/test-utils` を使用

## ビルド成果物

- **配布形式**: ES Module (`.js`) と CommonJS (`.umd.cjs`)
- **エントリーポイント**: `dist/MMFMRenderer.js` / `dist/MMFMRenderer.umd.cjs`
- **型定義**: `dist/index.d.ts`
- **スタイル**: `dist/style.css`

## 注意事項

### 未実装機能
README.md に記載されている以下の機能は未実装です:
- `sparkle` (きらきら)
- `unixtime` (相対時間)
- アニメーションの `delay` パラメータ

これらの機能を実装する場合は、mfm-js のドキュメントを参照してください。

### スタイルが未完成の機能
- `BlockCode.vue` (複数行のコード)
- `Inlinecode.vue` (一行のコード)

これらのコンポーネントは機能していますが、適切なスタイルが適用されていません。

## 言語

- **コードコメント**: 日本語または英語（日本語を推奨）
- **README/ドキュメント**: 日本語
- **コミットメッセージ**: 日本語または英語（どちらでも可）
- **変数名/関数名**: 英語（TypeScript/JavaScript の慣例に従う）

## リソース

- **MFM 仕様**: [mfm-js](https://github.com/misskey-dev/mfm.js)
- **Misskey**: [公式サイト](https://misskey-hub.net/)
- **Vue 3**: [公式ドキュメント](https://v3.vuejs.org/)

## 変更を加える際のチェックリスト

- [ ] TypeScript のコンパイルエラーがないか確認（`npm run build`）
- [ ] ESLint のエラーがないか確認（`npm run lint`）
- [ ] コードが Prettier でフォーマットされているか確認（`npm run format`）
- [ ] 変更内容が README.md の進捗表に反映されているか確認（該当する場合）
- [ ] 新しいコンポーネントが適切にエクスポートされているか確認
- [ ] ビルド成果物が正しく生成されるか確認

## その他

このプロジェクトは開発中です。コンポーネントの追加や改善を行う際は、既存のコードスタイルとアーキテクチャに従ってください。
