<template>
  <del class="strike"><MfmComponent :tokens="children" /></del>
</template>

<script setup lang="ts">
defineProps<{
  token?: any
  children?: any
  // 受け取らないと要素の className に入り、class="strike" が消える
  className?: string
}>()
</script>
