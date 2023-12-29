<template>
  <center>{{ token }}</center>
</template>

<script lang="ts">
export default {
  props: ["token", "children", "style"],
};
</script>
