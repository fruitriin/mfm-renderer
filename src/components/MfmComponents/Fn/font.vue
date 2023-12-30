<template>
  <MfmComponent
    :className="`fg ${className ?? ''}`"
    :tokens="children"
    :style="[{ fontFamily: Object.keys(token.args) }, style]"
  />
</template>

<script lang="ts">
export default {
  props: ["token", "children", "style", "className"],
};
</script>

<style>
</style>
