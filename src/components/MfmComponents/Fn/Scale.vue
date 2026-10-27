<template>
  <span :class="className" :style="[wrapperStyle, style]">
    <MfmComponent :tokens="children" />
  </span>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import type { CSSProperties } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'
import { mfmScaleKey, useMfmRenderOptions, useMfmScale, validNumber } from '../../../utils/mfmUtil'

const props = defineProps<{
  token?: MfmFn['props']
  children?: MfmInline[]
  style?: CSSProperties
  className?: string
}>()

// Misskey と同じく、どちらの向きも 5 倍までにする
const scaleX = computed(() => Math.min(validNumber(props.token?.args.x) ?? 1, 5))
const scaleY = computed(() => Math.min(validNumber(props.token?.args.y) ?? 1, 5))

const options = useMfmRenderOptions()

// Misskey と同じく、高度な MFM を止める設定のときは拡大縮小しない
const wrapperStyle = computed<CSSProperties>(() =>
  options.value.advancedMfm
    ? { display: 'inline-block', transform: `scale(${scaleX.value}, ${scaleY.value})` }
    : { display: 'inline-block' }
)

// Misskey と同じく、拡大縮小するときだけ倍率に大きいほうを掛ける
const scale = useMfmScale()
provide(
  mfmScaleKey,
  computed(() => (options.value.advancedMfm ? scale.value * Math.max(scaleX.value, scaleY.value) : scale.value))
)
</script>
