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

<script lang="ts">
// class と className が混在してるのやばそう
import { getComponent } from '../utils/mfmUtil.ts'
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      debugMode: this.debugMode
    }
  },
  props: {
    tokens: {
      required: true,
      type: Object
    },
    style: Object,
    className: String,
    class: String
  },
  methods: {
    getComponent
  }
})
</script>

<style scoped></style>
