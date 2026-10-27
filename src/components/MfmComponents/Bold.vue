<template>
  <b class="bold"><MfmComponent :tokens="children" /></b>
</template>

<script setup lang="ts">
defineProps<{
  children?: any
  // 受け取らないと要素の className に入り、class="bold" が消える
  className?: string
}>()
</script>
