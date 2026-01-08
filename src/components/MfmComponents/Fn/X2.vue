<template>
  <MfmComponent
    :className="`rotate ${className ?? ''}`"
    :tokens="children"
    :style="[{ fontSize: '200%' }, style]"
  />
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

<style></style>
