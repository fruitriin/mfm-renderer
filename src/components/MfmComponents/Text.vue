<template>
  <template v-for="(t, i) in parsedText">
    <span :style="style"> {{ t }}</span>
    <br v-if="showBr(t, i)" />
  </template>
</template>

<script lang="ts">
import { PropType } from "vue";

export default {
  inheritAttrs: true,
  props: {
    children: Object,
    token: Object as PropType<any>,
    plain: {
      type: Boolean,
      default: false,
    },
    nowrap: {
      type: Boolean,
      default: false,
    },
    note: Object,
    style: Object,
  },
  methods: {
    showBr(_text: string, index: number) {
      // 行末では改行しない
      if (index + 1 === this.parsedText.length) {
        return false;
      }

      return true;
    },
  },
  computed: {
    parsedText() {
      if (!this.plain) return this.token.text.split(/\r\n|\n|\r/);
      return [this.token.text.replace(/\n/g, " ")];
    },
  },
};
</script>
