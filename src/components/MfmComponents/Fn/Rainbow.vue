<template>
  <MfmComponent
    :className="`rotate ${className ?? ''}`"
    :tokens="children"
    :style="[
      {
        animation: `${token.args.speed ?? '0.5s'} ease 0s infinite normal none running mfm-rainbow`
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
