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
}>()
</script>

<style scoped></style>
