<template>
  <MfmComponent
    :className="`rotate ${className ?? ''}`"
    :tokens="children"
    :style="[
        {
            transform: `rotate(${token.deg ?? 90}deg)`,
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
