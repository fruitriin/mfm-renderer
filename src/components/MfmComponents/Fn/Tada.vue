<template>
  <MfmComponent
    :className="`rotate ${className ?? ''}`"
    :tokens="children"
    :style="[
      {
        animation: `${validTime(token?.args.speed) ?? '1s'} linear ${validTime(token?.args.delay) ?? '0s'} infinite normal both running tada`
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
