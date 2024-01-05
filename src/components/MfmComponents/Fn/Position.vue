<template>
  <MfmComponent
    :className="`position ${className ?? ''}`"
    :tokens="children"
    :style="[
      {
        transform: `translateX(${token.args.x}em) translateY(${token.args.y}em)`
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
