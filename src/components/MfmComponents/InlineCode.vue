<template>
  <code class="inline-code">{{ token.code }}</code>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

defineProps<{
  token?: any
  children?: any
  style?: CSSProperties
  className?: string
}>()
</script>

<style scoped>
.inline-code {
  background-color: rgba(175, 184, 193, 0.2);
  border: 1px solid rgba(175, 184, 193, 0.4);
  border-radius: 3px;
  padding: 2px 6px;
  font-family: 'Courier New', Courier, monospace, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  font-size: 0.9em;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
