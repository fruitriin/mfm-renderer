<template>
  <a class="url" :href="token.url" v-text="token.url" />
</template>

<script setup lang="ts">
defineProps<{
  token?: any
  children?: object
}>()
</script>

<style scoped></style>
