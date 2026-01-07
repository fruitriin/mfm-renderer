<template>
  <MfmComponent :tokens="children" />
</template>

<script setup lang="ts">
defineProps<{
  children?: any
  token?: any
  style?: object
  className?: string
}>()
</script>

<style scoped></style>
