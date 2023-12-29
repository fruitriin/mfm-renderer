<template>
  silent - {{ token.silent }}
  <a :href="token.url" :style="style">
    <MfmComponent :tokens="children" />
  </a>
</template>

<script lang="ts">
import { PropType } from "vue";

export default {
  props: {
    token: {
      type: Object as PropType<any>,
    },
    children: {
      type: Object,
    },
    style: {
      type: Object,
    },
  },
};
</script>

<style scoped></style>
