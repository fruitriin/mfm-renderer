<!--
  $[unixtime 1700000000]
  Misskey と同じく、中身のテキストを Unix 時刻（秒）として「絶対時刻 (相対時間)」で表示する
-->
<template>
  <span :class="`unixtime ${className ?? ''}`" :style="style" :title="absoluteTime">
    <i class="ti ti-clock"></i>
    <template v-if="isValid">{{ absoluteTime }} ({{ relativeTime }})</template>
    <template v-else>無効な日時</template>
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

// Misskey は最初の子がテキストのときだけ、その文字列を数値として読む
const time = computed(() => {
  const child = props.children?.[0]
  const unixtime = parseInt(child?.type === 'text' ? child.props.text : '', 10)
  return unixtime * 1000
})

const isValid = computed(() => !Number.isNaN(time.value))

const absoluteTime = computed(() => {
  if (!isValid.value) return ''
  return new Date(time.value).toLocaleString()
})

const relativeTime = computed(() => {
  const diff = Date.now() - time.value
  const abs = Math.abs(diff)
  const suffix = diff < 0 ? '後' : '前'
  if (abs < 60000) return diff < 0 ? 'まもなく' : 'たった今'
  if (abs < 3600000) return `${Math.floor(abs / 60000)}分${suffix}`
  if (abs < 86400000) return `${Math.floor(abs / 3600000)}時間${suffix}`
  if (abs < 2592000000) return `${Math.floor(abs / 86400000)}日${suffix}`
  if (abs < 31536000000) return `${Math.floor(abs / 2592000000)}ヶ月${suffix}`
  return `${Math.floor(abs / 31536000000)}年${suffix}`
})
</script>

<style>
.unixtime {
  display: inline-block;
  font-size: 90%;
  border: solid 1px var(--MI_THEME-divider, var(--divider, rgba(128, 128, 128, 0.3)));
  border-radius: 999px;
  padding: 4px 10px 4px 6px;
}

.unixtime i {
  margin-right: 0.25em;
}
</style>
