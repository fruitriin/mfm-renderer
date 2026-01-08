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
}>()
</script>
