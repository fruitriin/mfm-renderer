<template>
  {{ token.lang }}
  <pre class="block-code">
    <code>{{ token.code }}</code>
  </pre>
</template>

<script setup lang="ts">
// lang が与えられたらハイライトとか
import type { CSSProperties } from 'vue'

defineProps<{
  token?: any
  children?: any
  style?: CSSProperties
  className?: string
}>()
</script>
