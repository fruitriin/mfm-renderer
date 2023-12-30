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
    <pre>{{ tokens }}</pre>
  </div>
</template>

<script lang="ts">
// classとclassNameが混在してるのやばそう
import { getComponent } from "../utils/mfmUtil.ts";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MfmWrap",
  inject: ["debugMode"],
  props: {
    tokens: {
      required: true,
      type: Object,
    },
    style: Object,
    className: String,
    class: String,
  },
  methods: {
    getComponent,
  },
});
</script>

<style scoped></style>
