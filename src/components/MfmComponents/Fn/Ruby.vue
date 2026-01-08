<template>
  <ruby>
    {{ ruby.body }}
    <rt>{{ ruby.yomi }}</rt>
  </ruby>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'

const props = defineProps<{
  children?: any
  token?: any
  style?: CSSProperties
  className?: string
}>()

const ruby = computed(() => {
  const rubyText = props.children[0].props.text.split(' ')
  return {
    body: rubyText[0],
    yomi: rubyText[1]
  }
})
</script>

<style scoped></style>
