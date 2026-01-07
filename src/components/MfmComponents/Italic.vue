<template>
  <i class="italic"><MfmComponent :tokens="children" /></i>
</template>

<script setup lang="ts">
defineProps<{
  children?: any
}>()
</script>
