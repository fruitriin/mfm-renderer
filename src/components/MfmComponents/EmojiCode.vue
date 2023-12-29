<template>
  :{{ token.name }}:
  <!--  <img class="emoji" :src="emoji()" />-->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["token", "children", "className", "class", "style"],
});
</script>

<style scoped>
.emoji {
  height: 1.25em;
  vertical-align: -0.25em;
}
</style>
