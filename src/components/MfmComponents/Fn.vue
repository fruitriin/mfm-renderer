<template>
  <!--  Fn: {{ token }}-->
  <MfmComponent :tokens="children" :style="functionedStyle" />
</template>

<script>
export default {
  name: "Fn",
  props: ["token", "children"],
  computed: {
    functionedStyle() {
      switch (this.token.name) {
        case "bg":
          return { background: `#${this.token.args.color}` };
        case "fg":
          return { color: `#${this.token.args.color}` };
        case "sparkle":
          return { color: "yellow" };
        default:
          return { background: "red" };
      }
    },
  },
};
</script>
