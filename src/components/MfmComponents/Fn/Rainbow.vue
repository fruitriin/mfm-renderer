<template>
  <MfmComponent
    :className="`rotate ${useAnim ? '' : 'mfm-rainbow-fallback'} ${className ?? ''}`"
    :tokens="children"
    :style="[
      useAnim
        ? {
            animation: `${validTime(token?.args.speed) ?? '0.5s'} ease ${validTime(token?.args.delay) ?? '0s'} infinite normal none running mfm-rainbow`
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

// Misskey と同じく、アニメーションを止める設定のときは虹色の静的な表示にする
const useAnim = useMfmAnimation()
</script>

<style>
.mfm-rainbow-fallback {
  background-image: linear-gradient(
    to right,
    rgb(255, 0, 0) 0%,
    rgb(255, 165, 0) 17%,
    rgb(255, 255, 0) 33%,
    rgb(0, 255, 0) 50%,
    rgb(0, 255, 255) 67%,
    rgb(0, 0, 255) 83%,
    rgb(255, 0, 255) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>
