<template>
  <span :class="className" :style="[wrapperStyle, style]">
    <MfmComponent :tokens="children" />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'
import { validColor, validBorderStyle, validNumber } from '../../../utils/mfmUtil'

const props = defineProps<{
  token?: MfmFn['props']
  children?: MfmInline[]
  style?: CSSProperties
  className?: string
}>()

const wrapperStyle = computed<CSSProperties>(() => {
  const args = props.token?.args ?? {}

  const color = validColor(args.color)
  const style = validBorderStyle(args.style) ?? 'solid'
  const width = validNumber(args.width) ?? 1
  const radius = validNumber(args.radius) ?? 0

  return {
    display: 'inline-block',
    border: `${width}px ${style} ${color ? `#${color}` : 'var(--MI_THEME-accent, var(--accent))'}`,
    borderRadius: `${radius}px`,
    // noclip を付けないときは、はみ出た中身を切り取る
    ...(args.noclip ? {} : { overflow: 'clip' })
  }
})
</script>
