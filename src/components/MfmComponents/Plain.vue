<template>
  <span class="plain"><MfmComponent :tokens="children" /></span>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

defineProps<{
  children?: any
  token?: any
  style?: CSSProperties
  // 受け取らないと要素の className に入り、class="plain" が消える
  className?: string
}>()
</script>

<style scoped></style>
