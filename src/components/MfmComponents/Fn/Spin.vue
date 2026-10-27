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
  <span :class="className" :style="[wrapperStyle, style]">
    <MfmComponent :tokens="children" />
  </span>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
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

const wrapperStyle = computed<CSSProperties>(() => {
  if (!useAnim.value) return { display: 'inline-block' }
  const args = props.token?.args ?? {}
  // x・y で回転の軸を、left・alternate で向きを変える
  const name = args.x ? 'mfm-spinX' : args.y ? 'mfm-spinY' : 'mfm-spin'
  const direction = args.left ? 'reverse' : args.alternate ? 'alternate' : 'normal'
  return {
    display: 'inline-block',
    animation: `${name} ${validTime(args.speed) ?? '1.5s'} linear infinite`,
    animationDirection: direction,
    animationDelay: validTime(args.delay) ?? '0s'
  }
})
</script>
