<template>
  <MfmComponent
    :className="`scale ${className ?? ''}`"
    :tokens="children"
    :style="[
      {
        transform: `scale(${Math.min(token?.args.x ?? 1, 5)}, ${Math.min(token?.args.y ?? 1, 5)})`
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
