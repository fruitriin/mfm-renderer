<template>
  <!-- Misskey と同じく、数値でない・指定がないほうは 0 とみなす。高度な MFM を止める設定のときは動かさない -->
  <MfmComponent
    :className="`position ${className ?? ''}`"
    :tokens="children"
    :style="[
      options.advancedMfm
        ? {
            transform: `translateX(${validNumber(token?.args.x) ?? 0}em) translateY(${validNumber(token?.args.y) ?? 0}em)`
          }
        : {},
      style
    ]"
  />
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'
import { useMfmRenderOptions, validNumber } from '@/utils/mfmUtil'

defineProps<{
  token?: MfmFn['props']
  children?: MfmInline[]
  style?: CSSProperties
  className?: string
}>()

const options = useMfmRenderOptions()
</script>

<style></style>
