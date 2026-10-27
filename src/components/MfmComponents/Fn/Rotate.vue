<template>
  <!-- Misskey と同じく、数値でない・指定がないときは 90 度とみなす -->
  <MfmComponent
    :className="`rotate ${className ?? ''}`"
    :tokens="children"
    :style="[
      {
        transform: `rotate(${validNumber(token?.args.deg) ?? 90}deg)`,
        transformOrigin: 'center center'
      },
      style
    ]"
  />
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'
import { validNumber } from '@/utils/mfmUtil'

defineProps<{
  token?: MfmFn['props']
  children?: MfmInline[]
  style?: CSSProperties
  className?: string
}>()
</script>

<style></style>
