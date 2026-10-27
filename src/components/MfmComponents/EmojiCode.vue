<template>
  <img
    v-if="emojiMap[token.name]"
    :src="emojiMap[token.name].url"
    class="emoji"
    :class="{ normal: options.plain, 'original-size': scale >= 2.5 }"
  />
  <span v-else>:{{ token.name }}:</span>
  <!--  <img class="emoji" :src="emoji()" />-->
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, inject, unref } from 'vue'
import { useMfmRenderOptions, useMfmScale } from '../../utils/mfmUtil.ts'

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

const options = useMfmRenderOptions()
// Misskey は倍率が 2.5 以上のとき、縮小版ではなく元の画像を使う（useOriginalSize）。
// このレンダラーは常に元の画像を使うので、利用側がスタイルを当てられるよう class だけ付ける
const scale = useMfmScale()
</script>

<style scoped>
.emoji {
  height: 2em;
  vertical-align: middle;
  transition: transform 0.2s ease;
}

/* plain のときは Misskey と同じく文字に合わせた大きさにする */
.emoji.normal {
  height: 1.25em;
  vertical-align: -0.25em;
}
</style>
