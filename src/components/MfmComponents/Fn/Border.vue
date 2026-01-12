<template>
  <MfmComponent
    :className="`border ${className ?? ''}`"
    :tokens="children"
    :style="[borderStyle, style]"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'
import { validColor, validBorderStyle, validNumber } from '@/utils/mfmUtil'

const props = defineProps<{
  token?: MfmFn['props']
  children?: MfmInline[]
  style?: CSSProperties
  className?: string
}>()

const borderStyle = computed<CSSProperties>(() => {
  const args = props.token?.args ?? {}

  const color = validColor(args.color)
  const style = validBorderStyle(args.style) || 'solid'
  const width = validNumber(args.width) ?? 1
  const radius = validNumber(args.radius) ?? 0
  const noclip = 'noclip' in args

  return {
    border: color ? `${width}px ${style} #${color}` : `${width}px ${style} var(--accent)`,
    borderRadius: `${radius}px`,
    ...(!noclip && { overflow: 'clip' })
  }
})
</script>

<style></style>
