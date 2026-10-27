<template>
  <a class="url" :href="token.url" v-text="token.url" />
</template>

<script setup lang="ts">
defineProps<{
  token?: any
  children?: object
  // 受け取らないと要素の className に入り、class="url" が消える
  className?: string
}>()
</script>

<style scoped></style>
