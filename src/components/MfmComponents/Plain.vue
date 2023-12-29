<template>
  <span class="plain">{{ token }}</span>
</template>

<script lang="ts">
export default {
  props: ["children", "token", "style"],
};
</script>

<style scoped></style>
