<template>
  <MfmComponent
    :className="`position ${className ?? ''}`"
    :tokens="children"
    :style="[
        {
           animation: `${
                token.args.speed ?? '0.5s'
  } ease 0s infinite normal none running mfm-shake`,
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
