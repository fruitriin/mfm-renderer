<template>
  silent - {{ token.silent }}
  <a class="link" :class="className" :href="token.url" :style="style">
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
    className: {
      type: String,
    },
    style: {
      type: Object,
    },
  },
};
</script>

<style scoped></style>
