<template>
  <span v-if="!isSupported" :class="`Fn ${className ?? ''}`" :style="style"
    >$[{{ token.name }} <MfmComponent :tokens="children" />]</span
  >
  <component
    v-else
    :is="getComponent(token.name)"
    :className="`Fn ${token.name} ${className ?? ''}`"
    :token="token"
    :children="children"
    :style="style"
  />
</template>

<script lang="ts">
import { getComponent } from '../../utils/mfmUtil.ts'

export default {
  methods: { getComponent },
  computed: {
    // 未対応の関数は Misskey と同じく $[name ...] の形のまま表示する
    isSupported(): boolean {
      const name = getComponent(this.token.name)
      return this.$.appContext.components[name] != null
    }
  },
  props: ['token', 'tokens', 'children', 'style', 'className']
}
</script>

<style>
.Fn {
  display: inline-block;
}
</style>
