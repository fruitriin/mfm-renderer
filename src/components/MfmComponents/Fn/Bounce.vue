<template>
  <MfmComponent
    :className="`rotate ${className ?? ''}`"
    :tokens="children"
    :style="[
      {
        animation: `${
          token.args.speed ?? '0.75s'
        } linear 0s infinite normal none running mfm-bounce`,
        transformOrigin: 'center bottom'
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
