<template><img class="emoji" :src="emoji()" /></template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    token: {
      required: true,
    },
    note: {
      type: Object,
      required: true,
    },
  },
  methods: {
    emoji(): string {
      return this.note.emojis.find((e: { name: string }) => {
        return e.name == (this.token as any).name;
      }).url;
    },
  },
});
</script>

<style scoped>
.emoji {
  height: 1.25em;
  vertical-align: -0.25em;
}
</style>
