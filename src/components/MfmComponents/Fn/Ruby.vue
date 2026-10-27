<template>
  <!-- 中身がテキスト 1 つなら「本文 ルビ」と空白で分ける。それ以外は最後のテキストをルビにする（Misskey と同じ） -->
  <ruby v-if="simple" :class="className" :style="style">{{ simple.body }}<rt>{{ simple.yomi }}</rt></ruby>
  <ruby v-else :class="className" :style="style"><MfmComponent :tokens="bodyTokens" /><rt>{{ lastText }}</rt></ruby>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { useMfmNyaize } from '../../../utils/mfmUtil.ts'

import type { MfmFn, MfmInline } from 'mfm-js'

const props = defineProps<{
  children?: MfmInline[]
  token?: MfmFn['props']
  style?: CSSProperties
  className?: string
}>()

const nyaize = useMfmNyaize()

const simple = computed(() => {
  const children = props.children ?? []
  if (children.length !== 1) return null
  const child = children[0]
  // Misskey と同じく、本文とルビをまとめてにゃー化してから分ける
  const parts = nyaize.value(child.type === 'text' ? child.props.text : '').split(' ')
  return {
    body: parts[0] ?? '',
    yomi: parts[1] ?? ''
  }
})

const bodyTokens = computed(() => (props.children ?? []).slice(0, -1))

const lastText = computed(() => {
  const children = props.children ?? []
  const last = children[children.length - 1]
  return nyaize.value(last?.type === 'text' ? last.props.text : '').trim()
})
</script>
