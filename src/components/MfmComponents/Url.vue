<template>
  <a href="token.url" v-text="token.url" />
</template>

<script>
export default {
  name: "Url.vue",
  props: {
    token: Object,
    children: Object,
  },
};
</script>

<style scoped></style>
