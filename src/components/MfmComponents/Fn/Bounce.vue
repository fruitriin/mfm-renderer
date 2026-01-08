<template>
  <MfmComponent
    :className="`rotate ${className ?? ''}`"
    :tokens="children"
    :style="[
      {
        animation: `${
          token.args.speed ?? '0.75s'
        } linear 0s infinite normal none running mfm-bounce`,
        transformOrigin: 'center bottom'
      },
      style
    ]"
  />
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

defineProps<{
  token?: any
  children?: any
  style?: CSSProperties
  className?: string
}>()
</script>

<style></style>
