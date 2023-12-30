<template>
  <MfmComponent
    :className="`bg ${className ?? ''}`"
    :tokens="children"
    :style="[{ background: `#${token.args.color}` }, style]"
  />
</template>

<script lang="ts">
export default {
  props: ["token", "children", "style", "className"],
};
</script>

<style>
</style>
