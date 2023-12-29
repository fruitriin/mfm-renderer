<template>
  <MfmComponent
    v-bind="$attrs"
    class="Fn"
    :className="token.name"
    :tokens="children"
    :style="functionedStyle"
  />
</template>

<script lang="ts">
export default {
  name: "Fn",
  props: ["token", "children", "style", "className"],
  computed: {
    functionedStyle() {
      switch (this.token.name) {
        case "bg":
          return { background: `#${this.token.args.color}` };
        case "fg":
          return { color: `#${this.token.args.color}` };
        case "blur":
          return {};
        case "sparkle":
          return { color: "yellow" };
        default:
          return { background: "red" };
      }
    },
  },
};
</script>

<style>
.blur {
  filter: blur(6px);
  transition: filter 0.3s;
}
.blur:hover {
  filter: blur(0px);
}
</style>
