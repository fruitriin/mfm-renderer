<template>
  {{ token.lang }}
  <pre class="block-code">
    <code>{{ token.code }}</code>
  </pre>
</template>

<script setup lang="ts">
// lang が与えられたらハイライトとか
defineProps<{
  token?: any
  children?: any
  style?: object
  className?: string
}>()
</script>
