<template>
  <template v-for="(t, i) in parsedText" :key="i">
    <span class="text" :class="[className, $attrs.class]" :style="style"> {{ t }}</span>
    <br v-if="showBr(t, i)" />
  </template>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'

type Props = {
  children?: object
  token?: any
  plain?: boolean
  className?: string
  nowrap?: boolean
  note?: object
  style?: CSSProperties
}

const props = withDefaults(defineProps<Props>(), {
  plain: false,
  nowrap: false
})

const parsedText = computed(() => {
  if (!props.plain) return props.token.text.split(/\r\n|\n|\r/)
  return [props.token.text.replace(/\n/g, ' ')]
})

const showBr = (_text: string, index: number) => {
  // 行末では改行しない
  if (index + 1 === parsedText.value.length) {
    return false
  }

  return true
}
</script>
