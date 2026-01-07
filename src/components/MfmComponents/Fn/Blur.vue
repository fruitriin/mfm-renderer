<template>
  <MfmComponent
    :className="`blur ${className ?? ''}`"
    :tokens="children"
    :style="[{ fontFamily: Object.keys(token.args) }, style]"
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

<style>
.blur {
  filter: blur(6px);
  transition: filter 0.3s;
}
.blur:hover {
  filter: blur(0px);
}
</style>
