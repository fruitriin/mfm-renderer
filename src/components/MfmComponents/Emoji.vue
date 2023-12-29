<template>
  <span class="emoji">{{ token }}</span>
  <!--  <span v-html="token"></span>-->
</template>

<script lang="ts">
export default {
  props: {
    token: String,
  },
};
</script>

<style scoped>
.emoji {
  height: 1.25em;
  vertical-align: -0.25em;
}
</style>
