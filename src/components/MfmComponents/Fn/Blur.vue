<template>
  <MfmComponent
    :className="`blur ${className ?? ''}`"
    :tokens="children"
    :style="style"
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

<style>
.blur {
  filter: blur(6px);
  transition: filter 0.3s;
}
.blur:hover {
  filter: blur(0px);
}
</style>
