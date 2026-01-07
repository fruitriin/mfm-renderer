<template>
  <MfmComponent
    :className="`bg ${className ?? ''}`"
    :tokens="children"
    :style="[{ background: `#${token.args.color}` }, style]"
  />
</template>

<script setup lang="ts">
defineProps<{
  token?: any
  children?: any
  style?: object
  className?: string
}>()
</script>

<style></style>
