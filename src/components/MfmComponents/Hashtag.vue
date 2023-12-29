<template>
  <a class="hashtag" :href="'/tags/' + token.hashtag">#{{ token.hashtag }}</a>
</template>

<script lang="ts">
export default {
  props: ["token", "children", "style"],
};
</script>
