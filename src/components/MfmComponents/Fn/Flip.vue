<template>
  <MfmComponent
    :className="`flip ${className ?? ''}`"
    :tokens="children"
    :style="[
      {
        transform: `scale(${token.args.h ? 1 : -1}, ${token.args.v ? -1 : 1})`
      },
      style
    ]"
  />
</template>

<script lang="ts">
export default {
  props: ['token', 'children', 'style', 'className']
}
</script>

<style></style>
