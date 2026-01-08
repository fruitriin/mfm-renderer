<template>
  <pre class="inline-code">{{ token.code }}</pre>
</template>

<script setup lang="ts">
defineProps<{
  token?: any
  children?: any
  style?: object
  className?: string
}>()
</script>
