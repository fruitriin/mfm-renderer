<template>
  <MfmComponent
    :className="`scale ${className ?? ''}`"
    :tokens="children"
    :style="[
      {
        transform: `scale(${scaleX}, ${scaleY})`
      },
      style
    ]"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'
import { validNumber } from '@/utils/mfmUtil'

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
</script>

<style></style>
