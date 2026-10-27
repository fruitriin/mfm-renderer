<template>
  <span v-if="debugMode">silent - {{ token.silent }}</span>
  <a class="link" :class="className" :href="token.url" :style="style">
    <MfmComponent :tokens="children" />
  </a>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { inject, provide } from 'vue'
import { mfmDisableNyaizeKey } from '../../utils/mfmUtil.ts'

defineProps<{
  token?: any
  children?: object
  className?: string
  style?: CSSProperties
  class?: string
}>()

const debugMode = inject('debugMode', false)

// Misskey と同じく、リンクの表示テキストはにゃー化しない
provide(mfmDisableNyaizeKey, true)
</script>

<style scoped></style>
