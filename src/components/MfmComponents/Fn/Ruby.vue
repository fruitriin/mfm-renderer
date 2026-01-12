<template>
  <ruby>
    {{ ruby.body }}
    <rt>{{ ruby.yomi }}</rt>
  </ruby>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'

import type { MfmFn, MfmInline } from 'mfm-js'

const props = defineProps<{
  children?: MfmInline[]
  token?: MfmFn['props']
  style?: CSSProperties
  className?: string
}>()

const ruby = computed(() => {
  const firstChild = props.children?.[0]
  const rubyText = (firstChild && firstChild.type === 'text' && 'text' in firstChild.props)
    ? (firstChild.props.text as string).split(' ')
    : ['', '']
  return {
    body: rubyText[0] ?? '',
    yomi: rubyText[1] ?? ''
  }
})
</script>

<style scoped></style>
