<template>
  <MfmComponent
    :className="`flip ${className ?? ''}`"
    :tokens="children"
    :style="[
      {
        // Misskey と同じく、引数なしと h は左右、v は上下、h,v は上下左右に反転する
        transform: `scale(${token?.args.h || !token?.args.v ? -1 : 1}, ${token?.args.v ? -1 : 1})`
      },
      style
    ]"
  />
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'

defineProps<{
  token?: MfmFn['props']
  children?: MfmInline[]
  style?: CSSProperties
  className?: string
}>()
</script>

<style></style>
