<template>
  <MfmComponent
    :className="`flip ${className ?? ''}`"
    :tokens="children"
    :style="[
      {
        transform: `scale(${token.args.h ? 1 : -1}, ${token.args.v ? -1 : 1})`
      },
      style
    ]"
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
