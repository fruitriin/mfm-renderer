import { globalIgnores } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
  // ビルド出力と依存関係
  globalIgnores(['dist/**', 'dist-ssr/**', 'docs/**', 'coverage/**', '**/*.local']),
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,
  {
    rules: {
      // プロジェクトに応じてルールをカスタマイズ
      'vue/multi-word-component-names': 'off',
      // 以前の設定では検査していなかった。any は既存のコードに多いので、まずは警告にとどめる
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  }
)
