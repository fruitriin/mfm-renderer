<template>
  <!-- Misskey と同じく、数値でない・指定がないほうは 0 とみなす -->
  <MfmComponent
    :className="`position ${className ?? ''}`"
    :tokens="children"
    :style="[
      {
        transform: `translateX(${validNumber(token?.args.x) ?? 0}em) translateY(${validNumber(token?.args.y) ?? 0}em)`
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
