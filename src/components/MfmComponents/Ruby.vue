<template>{{ children }} {{ token }}</template>

<script lang="ts">
export default {
  props: ["children", "token", "style", "className"],
};
</script>

<style scoped></style>
