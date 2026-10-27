<template>
  <a class="hashtag" :href="'/tags/' + token.hashtag">#{{ token.hashtag }}</a>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

defineProps<{
  token?: any
  children?: any
  style?: CSSProperties
  // 受け取らないと要素の className に入り、class="hashtag" が消える
  className?: string
}>()
</script>

<style>
/* Misskey 2024.10 以降のテーマ変数（--MI_THEME-*）を使い、なければ以前の名前を使う */
.hashtag {
  color: var(--MI_THEME-hashtag, var(--hashtag, rgb(93, 176, 218)));
}
</style>
