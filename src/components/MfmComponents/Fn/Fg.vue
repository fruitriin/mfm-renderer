<template>
  <MfmComponent
    :className="`fg ${className ?? ''}`"
    :tokens="children"
    :style="[{ color: `#${token.args.color}` }, style]"
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
