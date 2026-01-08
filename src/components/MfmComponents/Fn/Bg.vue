<template>
  <MfmComponent
    :className="`bg ${className ?? ''}`"
    :tokens="children"
    :style="[{ background: `#${token.args.color}` }, style]"
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
