<template>
  <MfmComponent
    :className="`bg ${className ?? ''}`"
    :tokens="children"
    :style="[{ backgroundColor: `#${validColor(token?.args.color) ?? 'f00'}`, overflowWrap: 'anywhere' }, style]"
  />
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'
import { validColor } from '@/utils/mfmUtil'

defineProps<{
  token?: MfmFn['props']
  children?: MfmInline[]
  style?: CSSProperties
  className?: string
}>()
</script>

<style></style>
