<template>
  <MfmComponent
    :className="`flip ${className ?? ''}`"
    :tokens="children"
    :style="[
      {
        transform: `scale(${token?.args.h ? -1 : 1}, ${token?.args.v ? -1 : 1})`
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
