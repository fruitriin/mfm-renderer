<template>
  {{ token.lang }}
  <pre class="block-code">
    <code>{{ token.code }}</code>
  </pre>
</template>

<script lang="ts">
// lang が与えられたらハイライトとか
export default {
  props: ["token", "children", "style", "className"],
};
</script>
