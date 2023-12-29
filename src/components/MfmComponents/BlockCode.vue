<template>
  {{ token }} {{ children }}
  <pre class="block-code">{{ token.code }}</pre>
</template>

<script lang="ts">
export default {
  props: ["token", "children", "style", "className"],
};
</script>
