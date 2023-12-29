<template>Mention</template>

<script lang="ts">
import { PropType } from "vue";

const HOST = "https://misskey.ioo";
export default {
  props: {
    token: Object as PropType<any>,
    author: Object,
  },
  data() {
    return {
      key: Math.random(),
      host:
        (this.token.props.host == null &&
        this.author &&
        this.author.host != null
          ? this.author.host
          : this.token.props.host) || HOST,
      username: this.token.props.username,
    };
  },
};
</script>

<style scoped></style>
