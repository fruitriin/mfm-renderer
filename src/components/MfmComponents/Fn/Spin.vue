<!--
        /**
           * $[spin 🍮] $[spin.left 🍮] $[spin.alternate 🍮]
           * $[spin.x 🍮] $[spin.x,left 🍮] $[spin.x,alternate 🍮]
           * $[spin.y 🍮] $[spin.y,left 🍮] $[spin.y,alternate 🍮]
           *
           * $[spin.speed=5s 🍮]
           * $[spin.speed=2s,delay=1s 🍮]
           */
-->
<template>
  <MfmComponent
    :className="`position ${className ?? ''}`"
    :tokens="children"
    :style="[
      useAnim
        ? {
            animation: `${animationName} ${validTime(token?.args.speed) ?? '1.5s'} linear infinite`,
            animationDirection: animationDirection,
            animationDelay: validTime(token?.args.delay) ?? '0s'
          }
        : {},
      style
    ]"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'
import { useMfmAnimation, validTime } from '../../../utils/mfmUtil'

const props = defineProps<{
  token?: MfmFn['props']
  children?: MfmInline[]
  style?: CSSProperties
  className?: string
}>()

// Misskey と同じく、アニメーションを止める設定のときは動かさない
const useAnim = useMfmAnimation()

// アニメーション名の決定（x軸、y軸、または通常の回転）
const animationName = computed(() => {
  if (props.token?.args.x) return 'mfm-spinX'
  if (props.token?.args.y) return 'mfm-spinY'
  return 'mfm-spin'
})

// アニメーションの方向を決定（reverse、alternate、または通常）
const animationDirection = computed(() => {
  if (props.token?.args.left) return 'reverse'
  if (props.token?.args.alternate) return 'alternate'
  return 'normal'
})
</script>

<style></style>
