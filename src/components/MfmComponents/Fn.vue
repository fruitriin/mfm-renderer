<template>
  <component
    :is="getComponent(token?.name ?? '')"
    :className="`Fn ${token?.name} ${className ?? ''}`"
    :token="token"
    :children="children"
    :style="style"
  />
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'
import { getComponent } from '../../utils/mfmUtil.ts'

defineProps<{
  token?: MfmFn['props']
  tokens?: MfmInline[]
  children?: MfmInline[]
  style?: CSSProperties
  className?: string
}>()
</script>

<style>
.Fn {
  display: inline-block;
}
</style>
