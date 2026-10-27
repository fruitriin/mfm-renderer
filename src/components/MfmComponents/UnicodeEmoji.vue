<template>
  <span :style="style">{{ token.emoji }}</span>
</template>

<script setup lang="ts">
// 本当は twimojiやfluent emojiに置き換える
import type { CSSProperties } from 'vue'

defineProps<{
  children?: any
  token?: any
  class?: string
  style?: CSSProperties
  // 受け取らないと要素の className に入ってしまう
  className?: string
}>()
</script>

<style scoped></style>
