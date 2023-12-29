<template>
  <a :href="token.url" v-text="token.url" />
</template>

<script lang="ts">
import { PropType } from "vue";

export default {
  name: "Url.vue",
  props: {
    token: {
      type: Object as PropType<any>,
    },
    children: {
      type: Object,
    },
  },
};
</script>

<style scoped></style>
