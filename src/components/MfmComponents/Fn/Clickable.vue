<template>
  <span :class="`clickable ${className ?? ''}`" :style="style" @click.stop.prevent="onClick">
    <MfmComponent :tokens="children" />
  </span>
</template>

<script lang="ts">
import { inject } from 'vue'
import { mfmClickEvKey } from '../../../utils/mfmUtil.ts'

// $[clickable.ev=名前 ...] をクリックすると、MfmRenderer の clickEv イベントに ev の値を渡す
export default {
  props: ['token', 'children', 'style', 'className'],
  setup(props: { token: { args: Record<string, string | true> } }) {
    const emitClickEv = inject(mfmClickEvKey, () => {})
    return {
      onClick() {
        const ev = props.token.args.ev
        emitClickEv(typeof ev === 'string' ? ev : '')
      }
    }
  }
}
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>
