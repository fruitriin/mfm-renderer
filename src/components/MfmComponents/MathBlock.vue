<template>
  <!-- Misskey と同じく、数式は描画せずにそのまま表示する -->
  <code class="math-block">{{ token?.formula }}</code>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { MfmMathBlock } from 'mfm-js'

defineProps<{
  token?: MfmMathBlock['props']
  children?: unknown
  style?: CSSProperties
  // 受け取らないと要素の className に入り、class="math-block" が消える
  className?: string
}>()
</script>
