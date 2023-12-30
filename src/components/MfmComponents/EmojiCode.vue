<template>
  <img v-if="emojis[token.name]" :src="emojis[token.name].url" class="emoji" />
  <span v-else>:{{ token.name }}:</span>
  <!--  <img class="emoji" :src="emoji()" />-->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  inject: ["emojis"],
  data() {
    return {
      emojis: this.emojis as Record<string, any>,
    };
  },
  props: ["token", "children", "className", "class", "style"],
});
</script>

<style scoped>
.emoji {
  height: 2em;
  vertical-align: middle;
  transition: transform 0.2s ease;
}
</style>
