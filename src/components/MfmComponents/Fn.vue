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
        case "flip":
          // オプションなし = x -1, Y = 1
          // v のみ = X 1, Y -1
          // h.v = x -1, Y -1

          // v がある → Y -1
          // h がある -> X -1
          //
          return {
            transform: `scale(${this.token.args.h ? 1 : -1}, ${
              this.token.args.v ? -1 : 1
            })`,
          };
        case "rotate":
          const deg = this.token.args.deg ?? 90;
          return {
            transform: `rotate(${deg}deg)`,
          };
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
.flip {
  display: inline-block;
}
.rotate {
  display: inline-block;
}
.blur {
  filter: blur(6px);
  transition: filter 0.3s;
}
.blur:hover {
  filter: blur(0px);
}
</style>
