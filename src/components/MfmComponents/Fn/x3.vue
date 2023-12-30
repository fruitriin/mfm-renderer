<template>
  <MfmComponent
    :className="`rotate ${className ?? ''}`"
    :tokens="children"
    :style="[{ fontSize: '300%' }, style]"
  />
</template>

<script lang="ts">
export default {
  props: ["token", "children", "style", "className"],
};
</script>

<style>
</style>
