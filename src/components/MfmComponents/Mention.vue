<template>
  <a :href="host + '/' + token.acct">{{ token.acct }}</a>
</template>

<script lang="ts">
export default {
  props: ["token", "children", "style", "className"],
  computed: {
    host() {
      return this.token.host === null ? "" : this.token.host;
    },
  },
};
</script>

<style scoped></style>
