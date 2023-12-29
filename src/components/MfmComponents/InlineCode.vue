<template>
  {{ token }} {{ children }}
  <pre class="inline-code"></pre>
</template>

<script lang="ts">
export default {
  props: ["token", "children", "style"],
};
</script>
