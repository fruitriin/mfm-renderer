<template>
  <small class="small" style="opacity: 0.7"><MfmComponent :tokens="children" /></small>
</template>

<script setup lang="ts">
// smallが再帰を起こさないのは割りと謎
import type { CSSProperties } from 'vue'

defineProps<{
  children?: any
  token?: any
  style?: CSSProperties
  // 受け取らないと要素の className に入り、class="small" が消える
  className?: string
}>()
</script>
