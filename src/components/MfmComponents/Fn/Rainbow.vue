<template>
  <!-- Misskey と同じく、アニメーションを止める設定のときは静的な虹色にする -->
  <span v-if="!useAnim" :class="['mfm-rainbow-fallback', className]" :style="style">
    <MfmComponent :tokens="children" />
  </span>
  <span v-else :class="className" :style="[wrapperStyle, style]">
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

const useAnim = useMfmAnimation()

const wrapperStyle = computed<CSSProperties>(() => ({
  display: 'inline-block',
  animation: `mfm-rainbow ${validTime(props.token?.args.speed) ?? '1s'} linear infinite`,
  animationDelay: validTime(props.token?.args.delay) ?? '0s'
}))
</script>
