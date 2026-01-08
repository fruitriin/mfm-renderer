<template>
  <img v-if="emojis[token.name]" :src="emojis[token.name].url" class="emoji" />
  <span v-else>:{{ token.name }}:</span>
  <!--  <img class="emoji" :src="emoji()" />-->
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { inject } from 'vue'

defineProps<{
  token?: any
  children?: any
  className?: string
  class?: string
  style?: CSSProperties
}>()

const emojis = inject<Record<string, any>>('emojis', {})
</script>

<style scoped>
.emoji {
  height: 2em;
  vertical-align: middle;
  transition: transform 0.2s ease;
}
</style>
