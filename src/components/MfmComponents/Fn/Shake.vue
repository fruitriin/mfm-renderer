<template>
  <MfmComponent
    :className="`position ${className ?? ''}`"
    :tokens="children"
    :style="[
      {
        animation: `${validTime(token?.args.speed) ?? '0.5s'} ease ${validTime(token?.args.delay) ?? '0s'} infinite normal none running mfm-shake`
      },
      style
    ]"
  />
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'
import { validTime } from '../../../utils/mfmUtil'

defineProps<{
  token?: MfmFn['props']
  children?: MfmInline[]
  style?: CSSProperties
  className?: string
}>()
</script>

<style></style>
