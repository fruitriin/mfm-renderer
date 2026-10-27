<template>
  <i class="italic"><MfmComponent :tokens="children" /></i>
</template>

<script setup lang="ts">
defineProps<{
  children?: any
  // 受け取らないと要素の className に入り、class="italic" が消える
  className?: string
}>()
</script>
