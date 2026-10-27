<template>
  <!-- Misskey と同じく、高度な MFM を止める設定のときは拡大縮小しない -->
  <MfmComponent
    :className="`scale ${className ?? ''}`"
    :tokens="children"
    :style="[
      options.advancedMfm
        ? {
            transform: `scale(${scaleX}, ${scaleY})`
          }
        : {},
      style
    ]"
  />
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import type { CSSProperties } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'
import { mfmScaleKey, useMfmRenderOptions, useMfmScale, validNumber } from '@/utils/mfmUtil'

const props = defineProps<{
  token?: MfmFn['props']
  children?: MfmInline[]
  style?: CSSProperties
  className?: string
}>()

const scaleX = computed(() => {
  const x = validNumber(props.token?.args.x) ?? 1
  return Math.min(x, 5)
})

const scaleY = computed(() => {
  const y = validNumber(props.token?.args.y) ?? 1
  return Math.min(y, 5)
})

const options = useMfmRenderOptions()

// Misskey と同じく、拡大縮小するときだけ倍率に大きいほうを掛ける
const scale = useMfmScale()
provide(
  mfmScaleKey,
  computed(() => (options.value.advancedMfm ? scale.value * Math.max(scaleX.value, scaleY.value) : scale.value))
)
</script>

<style></style>
