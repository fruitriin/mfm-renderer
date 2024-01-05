<template>
  <span :style="style">{{ token.emoji }}</span>
</template>

<script lang="ts">
// 本当は twimojiやfluent emojiに置き換える
export default {
  props: ['children', 'token', 'class', 'style']
}
</script>

<style scoped></style>
