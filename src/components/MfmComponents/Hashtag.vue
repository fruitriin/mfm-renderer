<template>
  <a class="hashtag" :href="'/tags/' + token.hashtag">#{{ token.hashtag }}</a>
</template>

<script setup lang="ts">
defineProps<{
  token?: any
  children?: any
  style?: object
}>()
</script>
