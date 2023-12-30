<template>
  <MfmComponent
    :className="`blur ${className ?? ''}`"
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
.blur {
  filter: blur(6px);
  transition: filter 0.3s;
}
.blur:hover {
  filter: blur(0px);
}
</style>
