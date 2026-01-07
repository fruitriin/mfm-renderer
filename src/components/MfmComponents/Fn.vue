<template>
  <component
    :is="getComponent(token.name)"
    :className="`Fn ${token.name} ${className ?? ''}`"
    :token="token"
    :children="children"
    :style="style"
  />
</template>

<script setup lang="ts">
import { getComponent } from '../../utils/mfmUtil.ts'

defineProps<{
  token?: any
  tokens?: any
  children?: any
  style?: object
  className?: string
}>()
</script>

<style>
.Fn {
  display: inline-block;
}
</style>
