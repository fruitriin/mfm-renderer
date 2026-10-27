<template>
  <MfmComponent
    :className="`rotate ${className ?? ''}`"
    :tokens="children"
    :style="[
      useAnim
        ? {
            animation: `${validTime(token?.args.speed) ?? '1s'} linear ${validTime(token?.args.delay) ?? '0s'} infinite normal both running mfm-rubberBand`
          }
        : {},
      style
    ]"
  />
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'
import { useMfmAnimation, validTime } from '../../../utils/mfmUtil'

defineProps<{
  token?: MfmFn['props']
  children?: MfmInline[]
  style?: CSSProperties
  className?: string
}>()

// Misskey と同じく、アニメーションを止める設定のときは動かさない
const useAnim = useMfmAnimation()
</script>

<style></style>
