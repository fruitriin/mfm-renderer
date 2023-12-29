<template>
  <component
    :style="style"
    v-for="token in tokens"
    :is="`${getComponent(token.type)}`"
    :token="token.props"
    :children="token.children"
  />
  <div style="border: solid 1px red" v-if="true">
    <pre v-for="token in tokens">
component: {{ getComponent(token.type) }}
token: {{ token }}
    </pre>
  </div>
</template>

<script lang="ts">
import { getComponent } from "../utils/mfmUtil.ts";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MfmComponent",
  props: {
    tokens: {
      required: true,
      type: Object,
    },
    style: Object,
  },
  methods: {
    getComponent,
  },
});
</script>

<style scoped></style>
