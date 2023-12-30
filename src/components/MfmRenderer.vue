<template>
  <MfmComponent :tokens="parsedMfm" />
</template>

<script lang="ts">
import { mfm } from "../utils/mfmUtil.ts";
import { defineComponent } from "vue";
import MfmComponent from "./Mfm.vue";

export default defineComponent({
  components: {
    MfmComponent,
  },
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
