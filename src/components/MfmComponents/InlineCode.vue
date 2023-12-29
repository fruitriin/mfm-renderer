<template>InlineCode {{ token.code }}</template>

<script lang="ts">
export default {
  name: "InlineCode.vue",
  props: ["token", "children"],
  data() {
    return {
      inline: true,
    };
  },
};
</script>
