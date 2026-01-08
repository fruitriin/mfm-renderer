<template>
  <MfmComponent :tokens="children" />
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

defineProps<{
  children?: any
  token?: any
  style?: CSSProperties
  className?: string
}>()
</script>

<style scoped></style>
