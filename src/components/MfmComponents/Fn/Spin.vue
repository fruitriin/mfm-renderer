<!--
        /**
           * $[spin 🍮] $[spin.left 🍮] $[spin.alternate 🍮]
           * $[spin.x 🍮] $[spin.x,left 🍮] $[spin.x,alternate 🍮]
           * $[spin.y 🍮] $[spin.y,left 🍮] $[spin.y,alternate 🍮]
           * $[spin.x,y 🍮] $[spin.x,y,left 🍮] $[spin.x,y,alternate 🍮]
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
      {
        animation: `${validTime(token?.args.speed) ?? '1.5s'} linear ${validTime(token?.args.delay) ?? '0s'} infinite ${animationDirection} none running ${animationName}`
      },
      style
    ]"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'
import { validTime } from '../../../utils/mfmUtil'

const props = defineProps<{
  token?: MfmFn['props']
  children?: MfmInline[]
  style?: CSSProperties
  className?: string
}>()

// アニメーション名の決定（x軸、y軸、両軸、または通常の回転）
const animationName = computed(() => {
  const hasX = props.token?.args.x
  const hasY = props.token?.args.y

  if (hasX && hasY) return 'mfm-spinXY'
  if (hasX) return 'mfm-spinX'
  if (hasY) return 'mfm-spinY'
  return 'mfm-spin'
})

// アニメーションの方向を決定（reverse、alternate、または通常）
// alternateとleftの両方が指定された場合はalternateを優先
const animationDirection = computed(() => {
  if (props.token?.args.alternate) return 'alternate'
  if (props.token?.args.left) return 'reverse'
  return 'normal'
})
</script>

<style></style>
