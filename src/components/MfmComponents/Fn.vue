<template>
  <MfmComponent
    class="Fn"
    :className="`${token.name} ${className ?? ''}`"
    :tokens="children"
    :style="[functionedStyle, style]"
  />
</template>

<script lang="ts">
export default {
  props: ["token", "children", "style", "className", "class"],
  computed: {
    functionedStyle() {
      switch (this.token.name) {
        case "font":
          return { fontFamily: Object.keys(this.token.args).join(" ") };
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
