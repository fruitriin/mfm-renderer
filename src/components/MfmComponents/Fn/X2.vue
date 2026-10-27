<template>
  <MfmComponent
    :className="`x2 ${className ?? ''}`"
    :tokens="children"
    :style="[advancedMfm ? { fontSize: '200%' } : {}, style]"
  />
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { mfmScaleKey, useMfmRenderOptions, useMfmScale } from '../../../utils/mfmUtil'
import type { CSSProperties } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'

defineProps<{
  token?: MfmFn['props']
  children?: MfmInline[]
  style?: CSSProperties
  className?: string
}>()
// Misskey と同じく、高度な MFM を止める設定のときは大きくしない
const options = useMfmRenderOptions()
const advancedMfm = computed(() => options.value.advancedMfm)

// 倍率は高度な MFM の設定にかかわらず掛け合わせる（Misskey と同じ）
const scale = useMfmScale()
provide(
  mfmScaleKey,
  computed(() => scale.value * 2)
)
</script>

<style></style>
