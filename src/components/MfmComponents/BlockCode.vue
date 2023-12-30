<template>
  {{ token.lang }}
  <pre class="block-code">{{ token.code }}</pre>
</template>

<script lang="ts">
// langが与えられたらハイライトとか
export default {
  props: ["token", "children", "style", "className"],
};
</script>
