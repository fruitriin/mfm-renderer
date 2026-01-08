<template>
  <span v-if="debugMode">silent - {{ token.silent }}</span>
  <a class="link" :class="className" :href="token.url" :style="style">
    <MfmComponent :tokens="children" />
  </a>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { inject } from 'vue'

defineProps<{
  token?: any
  children?: object
  className?: string
  style?: CSSProperties
  class?: string
}>()

const debugMode = inject('debugMode', false)
</script>

<style scoped></style>
