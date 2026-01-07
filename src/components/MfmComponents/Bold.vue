<template>
  <b class="bold"><MfmComponent :tokens="children" /></b>
</template>

<script setup lang="ts">
defineProps<{
  children?: any
}>()
</script>
