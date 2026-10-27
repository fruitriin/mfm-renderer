<template>
  <!-- Misskey と同じく、数式は描画せずにそのまま表示する -->
  <code class="math-inline">{{ token?.formula }}</code>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { MfmMathInline } from 'mfm-js'

defineProps<{
  token?: MfmMathInline['props']
  children?: unknown
  style?: CSSProperties
  // 受け取らないと要素の className に入り、class="math-inline" が消える
  className?: string
}>()
</script>
