<template>
  <pre class="block-code" v-if="highlightedCode" v-html="highlightedCode"></pre>
  <!-- pre の中に改行やインデントを入れると、そのまま表示されてしまう -->
  <pre class="block-code" v-else><code>{{ token?.code }}</code></pre>
</template>

<script setup lang="ts">
import { ref, watch, type CSSProperties } from 'vue'
import type { MfmCodeBlock } from 'mfm-js'

const props = defineProps<{
  token?: MfmCodeBlock['props']
  children?: any
  style?: CSSProperties
  className?: string
}>()

const highlightedCode = ref<string>('')

// 同じコンポーネントのまま code や lang が変わることがあるので、そのたびにハイライトし直す
watch(
  () => [props.token?.code, props.token?.lang] as const,
  async ([code, lang], _old, onCleanup) => {
    let cancelled = false
    onCleanup(() => {
      cancelled = true
    })
    if (!lang || !code) {
      highlightedCode.value = ''
      return
    }
    // 新しい結果ができるまでは前のハイライトを残し、入力中のちらつきを抑える
    try {
      // shiki は必要になったときだけ読み込む。読み込めない環境（UMD を script タグで使う場合など）ではハイライトせずに表示する
      const { codeToHtml } = await import('shiki')
      const html = await codeToHtml(code, { lang, theme: 'github-dark' })
      // 待っている間に次の入力が来ていたら、古い結果で上書きしない
      if (!cancelled) highlightedCode.value = html
    } catch (error) {
      // 言語が認識できない場合はフォールバック
      console.warn('Shiki highlighting failed:', error)
      if (!cancelled) highlightedCode.value = ''
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.block-code {
  background-color: #1e1e1e;
  /* ハイライトしないときも暗い背景で読めるよう、文字色を明示する */
  color: #e1e4e8;
  border: 1px solid #404040;
  border-radius: 6px;
  padding: 12px 16px;
  margin: 8px 0;
  overflow-x: auto;
  font-family: 'Courier New', Courier, monospace, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  font-size: 14px;
  line-height: 1.5;
}

.block-code code {
  font-family: inherit;
  background: transparent;
  padding: 0;
  border: none;
}

/* Shikiが生成するpreタグのスタイルを調整 */
.block-code :deep(pre) {
  margin: 0;
  padding: 0;
  background: transparent !important;
  overflow-x: visible;
}

.block-code :deep(code) {
  font-family: inherit;
  background: transparent;
}
</style>
