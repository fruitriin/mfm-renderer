<template>
  <MfmComponent
    :className="`position ${className ?? ''}`"
    :tokens="children"
    :style="[
      {
        transform: `translateX(${token.args.x}em) translateY(${token.args.y}em)`
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
