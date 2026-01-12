<template>
  <MfmComponent
    :className="`rotate ${className ?? ''}`"
    :tokens="children"
    :style="[
      {
        animation: `${validTime(token.args.speed) ?? '1s'} linear ${validTime(token.args.delay) ?? '0s'} infinite normal none running mfm-twitch`
      },
      style
    ]"
  />
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { validTime } from '../../../utils/mfmUtil'

defineProps<{
  token?: any
  children?: any
  style?: CSSProperties
  className?: string
}>()
</script>

<style></style>
