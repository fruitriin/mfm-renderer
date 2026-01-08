<template>
  <MfmComponent
    :className="`flip ${className ?? ''}`"
    :tokens="children"
    :style="[
      {
        transform: `scale(${token.args.h ? 1 : -1}, ${token.args.v ? -1 : 1})`
      },
      style
    ]"
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
