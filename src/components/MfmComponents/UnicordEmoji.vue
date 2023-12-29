<template>
  {{ token.emoji }}
</template>

<script lang="ts">
import { PropType } from "vue";

export default {
  props: {
    token: {
      type: Object as PropType<{ emoji: string }>,
      required: true,
    },
    children: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped></style>
