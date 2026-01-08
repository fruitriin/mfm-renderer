<template>
  <a class="hashtag" :href="'/tags/' + token.hashtag">#{{ token.hashtag }}</a>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

defineProps<{
  token?: any
  children?: any
  style?: CSSProperties
}>()
</script>
