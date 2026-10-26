<template>
  <span v-if="!isSupported" :class="`Fn ${className ?? ''}`" :style="style"
    >$[{{ token?.name }} <MfmComponent :tokens="children" />]</span
  >
  <component
    v-else
    :is="getComponent(token?.name ?? '')"
    :className="`Fn ${token?.name} ${className ?? ''}`"
    :token="token"
    :children="children"
    :style="style"
  />
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, getCurrentInstance } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'
import { getComponent } from '../../utils/mfmUtil.ts'

const props = defineProps<{
  token?: MfmFn['props']
  tokens?: MfmInline[]
  children?: MfmInline[]
  style?: CSSProperties
  className?: string
}>()

const appComponents = getCurrentInstance()?.appContext.components ?? {}

// 未対応の関数は Misskey と同じく $[name ...] の形のまま表示する
const isSupported = computed(() => {
  const name = getComponent(props.token?.name ?? '')
  return name !== '' && appComponents[name] != null
})
</script>

<style>
.Fn {
  display: inline-block;
}
</style>
