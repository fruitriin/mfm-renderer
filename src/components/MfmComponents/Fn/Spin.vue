<!--
        /**
           * $[spin 🍮] $[spin.left 🍮] $[spin.alternate 🍮]
           * $[spin.x 🍮] $[spin.x,left 🍮] $[spin.x,alternate 🍮]
           * $[spin.y 🍮] $[spin.y,left 🍮] $[spin.y,alternate 🍮]
           *
           * $[spin.speed=5s 🍮]
           */
-->
<template>
  <MfmComponent
    :className="`position ${className ?? ''}`"
    :tokens="children"
    :style="[
      {
        animation: `${token.args.speed ?? '1.5s'} linear 0s infinite normal none running mfm-spin`
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
