<template>
  <MfmComponent :tokens="parsedMfm" />
</template>

<script lang="ts">
import { getComponent, mfm } from "../utils/mfmUtil.ts";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    text: {
      required: true,
      type: String,
    },
  },
  methods: {
    getComponent,
  },
  computed: {
    parsedMfm() {
      return mfm(this.text, false);
    },
  },
});
</script>

<style scoped></style>
