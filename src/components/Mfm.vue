<template>
  <component
    :style="style"
    :className="className"
    v-for="token in tokens"
    :is="`${getComponent(token.type)}`"
    :token="token.props"
    :children="token.children"
  />

  <div style="border: solid 1px red" v-if="debugMode">
    <div v-for="token in tokens">
      <p>Selected: {{ getComponent(token.type) }}</p>
      <pre>{{ token }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
// class と className が混在してるのやばそう
import { getComponent } from '../utils/mfmUtil.ts'

defineProps<{
  tokens: any
  style?: object
  className?: string
  class?: string
}>()
</script>

<style scoped></style>
