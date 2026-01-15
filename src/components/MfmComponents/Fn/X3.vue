<template>
  <MfmComponent
    :className="`x3 ${className ?? ''}`"
    :tokens="children"
    :style="[{ fontSize: '300%' }, style]"
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
