<template>
  <MfmComponent :tokens="parsedMfm" />
</template>

<script lang="ts">
import { mfm, mfmClickEvKey } from '../utils/mfmUtil.ts'
import { defineComponent } from 'vue'
import MfmComponent from './Mfm.vue'

export default defineComponent({
  components: {
    MfmComponent
  },
  props: {
    text: {
      required: true,
      type: String
    }
  },
  emits: ['clickEv'],
  provide() {
    return {
      [mfmClickEvKey as symbol]: (ev: string) => this.$emit('clickEv', ev)
    }
  },
  computed: {
    parsedMfm() {
      return mfm(this.text, false)
    }
  }
})
</script>

<style scoped></style>
