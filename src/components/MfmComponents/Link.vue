<template>
  <span v-if="debugMode">silent - {{ token.silent }}</span>
  <a class="link" :class="className" :href="token.url" :style="style">
    <MfmComponent :tokens="children" />
  </a>
</template>

<script lang="ts">
import { PropType } from "vue";

export default {
  inject: ["debugMode"],
  props: {
    token: {
      type: Object as PropType<any>,
    },
    children: {
      type: Object,
    },
    className: {
      type: String,
    },
    style: {
      type: Object,
    },
    class: {
      type: String,
    },
  },
};
</script>

<style scoped></style>
