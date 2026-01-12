<template>
  <MfmComponent
    :className="`rotate ${className ?? ''}`"
    :tokens="children"
    :style="[
      {
        transform: `scale(${token?.args.x}, ${token?.args.y})`
      },
      style
    ]"
  />
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'

defineProps<{
  token?: MfmFn['props']
  children?: MfmInline[]
  style?: CSSProperties
  className?: string
}>()
</script>

<style></style>
