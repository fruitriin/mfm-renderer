<template>
  <span :class="`clickable ${className ?? ''}`" :style="style" @click.stop.prevent="onClick">
    <MfmComponent :tokens="children" />
  </span>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { inject } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'
import { mfmClickEvKey } from '../../../utils/mfmUtil.ts'

const props = defineProps<{
  token?: MfmFn['props']
  children?: MfmInline[]
  style?: CSSProperties
  className?: string
}>()

const emitClickEv = inject(mfmClickEvKey, () => {})

// $[clickable.ev=名前 ...] をクリックすると、MfmRenderer の clickEv イベントに ev の値を渡す
function onClick() {
  const ev = props.token?.args.ev
  emitClickEv(typeof ev === 'string' ? ev : '')
}
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>
