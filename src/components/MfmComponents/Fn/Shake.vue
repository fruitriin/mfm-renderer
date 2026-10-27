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

const wrapperStyle = computed<CSSProperties>(() => ({
  display: 'inline-block',
  ...(useAnim.value
    ? {
        animation: `mfm-shake ${validTime(props.token?.args.speed) ?? '0.5s'} ease infinite`,
        animationDelay: validTime(props.token?.args.delay) ?? '0s'
      }
    : {})
}))
</script>
