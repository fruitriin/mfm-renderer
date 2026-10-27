<template>
  <component
    :style="style"
    :className="className"
    v-for="(token, index) in tokens"
    :key="index"
    :is="`${getComponent(token.type)}`"
    :token="token.props"
    :children="token.children"
  />

  <div style="border: solid 1px red" v-if="debugMode">
    <div v-for="(token, index) in tokens" :key="index">
      <p>Selected: {{ getComponent(token.type) }}</p>
      <pre>{{ token }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
// class と className が混在してるのやばそう
import type { CSSProperties } from 'vue'
import { getComponent } from '../utils/mfmUtil.ts'

const props = defineProps<{
  tokens: any
  style?: CSSProperties
  className?: string
  class?: string
  debug?: boolean
}>()

const debugMode = props.debug ? true : false
</script>

<!--
  アニメーションの keyframes など、MFM の表示に使う CSS。ライブラリの style.css に含める。
  library.ts で import すると、型定義（library.d.ts）に CSS の import が残り、利用側の型チェックで見つからないと言われる
-->
<style src="../mfm.css"></style>
