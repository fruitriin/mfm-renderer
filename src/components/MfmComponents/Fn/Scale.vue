<template>
  <MfmComponent
    :className="`rotate ${className ?? ''}`"
    :tokens="children"
    :style="[
        {
            transform: `scale(${token.args.x}, ${token.args.y})`
        }, style]"
  />
</template>

<script lang="ts">
export default {
  props: ["token", "children", "style", "className"],
};
</script>

<style>
</style>
