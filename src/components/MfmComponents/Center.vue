<template>
  <div class="center">
    <MfmComponent :tokens="children" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  children?: any
  class?: string
  className?: string
}>()
</script>
<style>
.center {
  text-align: center;
}
</style>
