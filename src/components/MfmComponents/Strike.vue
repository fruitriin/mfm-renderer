<template>
  <del class="strike"><MfmComponent :tokens="children" /></del>
</template>

<script setup lang="ts">
defineProps<{
  token?: any
  children?: any
}>()
</script>
