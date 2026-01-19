<template>
  <pre class="block-code" v-if="highlightedCode" v-html="highlightedCode"></pre>
  <pre class="block-code" v-else>
    <code>{{ token.code }}</code>
  </pre>
</template>

<script setup lang="ts">
import { ref, onMounted, type CSSProperties } from 'vue'
import { codeToHtml } from 'shiki'

const props = defineProps<{
  token?: any
  children?: any
  style?: CSSProperties
  className?: string
}>()

const highlightedCode = ref<string>('')

onMounted(async () => {
  if (props.token?.lang && props.token?.code) {
    try {
      const html = await codeToHtml(props.token.code, {
        lang: props.token.lang,
        theme: 'github-dark'
      })
      highlightedCode.value = html
    } catch (error) {
      // 言語が認識できない場合はフォールバック
      console.warn('Shiki highlighting failed:', error)
    }
  }
})
</script>

<style scoped>
.block-code {
  background-color: #1e1e1e;
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
