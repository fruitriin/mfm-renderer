<template>
  <!--  AST: {{ parsedMfm }}-->
  <MfmComponent :tokens="parsedMfm" />
</template>

<script lang="ts">
import { mfm } from "../utils/mfmUtil.ts";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    text: {
      required: true,
      type: String,
    },
  },
  computed: {
    parsedMfm() {
      return mfm(this.text, false);
    },
  },
});
</script>

<style scoped></style>
