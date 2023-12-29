<template>
  <div>{{ token.query }} <button>検索</button></div>
</template>

<script lang="ts">
import { PropType } from "vue";

export default {
  props: {
    token: {
      type: Object as PropType<{ query: string }>,
      required: true,
    },
    children: {
      type: Object,
    },
  },
};
</script>

<style scoped></style>
