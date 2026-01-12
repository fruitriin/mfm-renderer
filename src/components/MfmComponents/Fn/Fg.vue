<template>
  <MfmComponent
    :className="`fg ${className ?? ''}`"
    :tokens="children"
    :style="[{ color: `#${token?.args.color}` }, style]"
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
