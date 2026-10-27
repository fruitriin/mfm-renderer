<template>
  <span :class="className" :style="[wrapperStyle, style]">
    <MfmComponent :tokens="children" />
  </span>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'
import { validColor } from '../../../utils/mfmUtil'

const props = defineProps<{
  token?: MfmFn['props']
  children?: MfmInline[]
  style?: CSSProperties
  className?: string
}>()

// Misskey と同じく、色が正しくないときは赤にする
const wrapperStyle = computed<CSSProperties>(() => ({
  display: 'inline-block',
  color: `#${validColor(props.token?.args.color) ?? 'f00'}`,
  overflowWrap: 'anywhere'
}))
</script>
