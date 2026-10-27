<template>
  <span :class="className" :style="[wrapperStyle, style]">
    <MfmComponent :tokens="children" />
  </span>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'
import { validNumber } from '../../../utils/mfmUtil'

const props = defineProps<{
  token?: MfmFn['props']
  children?: MfmInline[]
  style?: CSSProperties
  className?: string
}>()

// Misskey と同じく、数値でない・指定がないときは 90 度とみなす
const wrapperStyle = computed<CSSProperties>(() => ({
  display: 'inline-block',
  transform: `rotate(${validNumber(props.token?.args.deg) ?? 90}deg)`,
  transformOrigin: 'center center'
}))
</script>
