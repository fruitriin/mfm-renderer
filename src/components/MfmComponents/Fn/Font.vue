<template>
  <!-- Misskey と同じく、フォントの指定がないときは $[font ...] のまま表示する -->
  <span v-if="family == null" :class="className" :style="style">$[{{ token?.name }} <MfmComponent :tokens="children" />]</span>
  <span v-else :class="className" :style="[{ display: 'inline-block', fontFamily: family }, style]">
    <MfmComponent :tokens="children" />
  </span>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'

const props = defineProps<{
  token?: MfmFn['props']
  children?: MfmInline[]
  style?: CSSProperties
  className?: string
}>()

const family = computed(() => {
  const args = props.token?.args ?? {}
  if (args.serif) return 'serif'
  if (args.monospace) return 'monospace'
  if (args.cursive) return 'cursive'
  if (args.fantasy) return 'fantasy'
  if (args.emoji) return 'emoji'
  if (args.math) return 'math'
  return null
})
</script>
