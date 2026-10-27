<template>
  <img
    v-if="options.emojiStyle === 'twemoji' && !failed"
    class="emoji twemoji"
    :src="`${options.twemojiBase}/${twemojiFileName(token.emoji)}.svg`"
    :alt="token.emoji"
    :title="token.emoji"
    :style="style"
    decoding="async"
    draggable="false"
    @error="failed = true"
  />
  <span v-else :style="style">{{ token.emoji }}</span>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CSSProperties } from 'vue'
import { twemojiFileName, useMfmRenderOptions } from '../../utils/mfmUtil.ts'

defineProps<{
  children?: any
  token?: any
  class?: string
  style?: CSSProperties
  // 受け取らないと要素の className に入ってしまう
  className?: string
}>()

const options = useMfmRenderOptions()
// 画像が読めなかったときは、OS の絵文字で表示する
const failed = ref(false)
</script>

<style scoped>
/* Misskey の MkEmoji と同じ大きさ（カスタム絵文字の 2em より小さい） */
.twemoji {
  height: 1.25em;
  vertical-align: -0.25em;
}
</style>
