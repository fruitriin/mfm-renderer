<template>
  <span :class="className" :style="[wrapperStyle, style]">
    <MfmComponent :tokens="children" />
  </span>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'

const props = defineProps<{
  token?: MfmFn['props']
  children?: MfmInline[]
  style?: CSSProperties
  className?: string
}>()

// Misskey と同じく、引数なしと h は左右、v は上下、h,v は上下左右に反転する
const wrapperStyle = computed<CSSProperties>(() => {
  const args = props.token?.args ?? {}
  const transform = args.h && args.v ? 'scale(-1, -1)' : args.v ? 'scaleY(-1)' : 'scaleX(-1)'
  return { display: 'inline-block', transform }
})
</script>
