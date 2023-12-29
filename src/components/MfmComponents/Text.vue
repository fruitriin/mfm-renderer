<template>
  <template v-for="(t, i) in parsedText">
    <span class="text" :class="[className, $attrs.class]" :style="style">
      {{ t }}</span
    >
    <br v-if="showBr(t, i)" />
  </template>
</template>

<script lang="ts">
import { PropType } from "vue";

export default {
  props: {
    children: Object,
    token: Object as PropType<any>,
    plain: {
      type: Boolean,
      default: false,
    },
    className: String,
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
