<template>
  <span :style="style">{{ token.emoji }}</span>
</template>

<script setup lang="ts">
// 本当は twimojiやfluent emojiに置き換える
defineProps<{
  children?: any
  token?: any
  class?: string
  style?: object
}>()
</script>

<style scoped></style>
