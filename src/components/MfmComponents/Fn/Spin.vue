<!--
        /**
           * $[spin 🍮] $[spin.left 🍮] $[spin.alternate 🍮]
           * $[spin.x 🍮] $[spin.x,left 🍮] $[spin.x,alternate 🍮]
           * $[spin.y 🍮] $[spin.y,left 🍮] $[spin.y,alternate 🍮]
           *
           * $[spin.speed=5s 🍮]
           */
-->
<template>
  <MfmComponent
    :className="`position ${className ?? ''}`"
    :tokens="children"
    :style="[
      {
        animation: `${token.args.speed ?? '1.5s'} linear 0s infinite normal none running mfm-spin`
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
