<template>
  <template v-for="(t, i) in parsedText" :key="i">
    <span class="text" :class="[className, $attrs.class]" :style="style"> {{ t }}</span>
    <br v-if="showBr(t, i)" />
  </template>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { useMfmNyaize, useMfmRenderOptions } from '../../utils/mfmUtil.ts'

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

const options = useMfmRenderOptions()
const nyaize = useMfmNyaize()

const parsedText = computed(() => {
  const text = nyaize.value(props.token.text)
  // plain は MfmRenderer から渡される。props の plain は以前からある指定のため残す
  if (!props.plain && !options.value.plain) return text.split(/\r\n|\n|\r/)
  return [text.replace(/\r\n|\n|\r/g, ' ')]
})

const showBr = (_text: string, index: number) => {
  // 行末では改行しない
  if (index + 1 === parsedText.value.length) {
    return false
  }

  return true
}
</script>
