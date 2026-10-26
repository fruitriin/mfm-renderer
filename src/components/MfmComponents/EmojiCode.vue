<template>
  <img v-if="emojiMap[token.name]" :src="emojiMap[token.name].url" class="emoji" />
  <span v-else>:{{ token.name }}:</span>
  <!--  <img class="emoji" :src="emoji()" />-->
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, inject, unref } from 'vue'

defineProps<{
  token?: any
  children?: any
  className?: string
  class?: string
  style?: CSSProperties
}>()

// provide 側は object でも ref・computed でもよい
const emojis = inject<any>('emojis', {})
const emojiMap = computed<Record<string, any>>(() => unref(emojis) ?? {})
</script>

<style scoped>
.emoji {
  height: 2em;
  vertical-align: middle;
  transition: transform 0.2s ease;
}
</style>
