<template>
  <!-- Misskey と同じく、高度な MFM を止める設定のときは $[position ...] のまま表示する -->
  <span v-if="!options.advancedMfm" :class="className" :style="style">$[{{ token?.name }} <MfmComponent :tokens="children" />]</span>
  <span v-else :class="className" :style="[wrapperStyle, style]">
    <MfmComponent :tokens="children" />
  </span>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'
import { useMfmRenderOptions, validNumber } from '../../../utils/mfmUtil'

const props = defineProps<{
  token?: MfmFn['props']
  children?: MfmInline[]
  style?: CSSProperties
  className?: string
}>()

const options = useMfmRenderOptions()

// Misskey と同じく、数値でない・指定がないほうは 0 とみなす
const wrapperStyle = computed<CSSProperties>(() => ({
  display: 'inline-block',
  transform: `translateX(${validNumber(props.token?.args.x) ?? 0}em) translateY(${validNumber(props.token?.args.y) ?? 0}em)`
}))
</script>
