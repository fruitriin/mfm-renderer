<template>
  <MfmComponent
    :className="`fg ${className ?? ''}`"
    :tokens="children"
    :style="[{ color: `#${token.args.color}` }, style]"
  />
</template>

<script lang="ts">
export default {
  props: ['token', 'children', 'style', 'className']
}
</script>

<style></style>
