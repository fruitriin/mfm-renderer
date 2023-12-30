<template>
  <MfmComponent
    :className="`Fn ${token.name} ${className ?? ''}`"
    :tokens="children"
    :style="[functionedStyle, style]"
  />
</template>

<script lang="ts">
export default {
  props: ["token", "children", "style", "className"],
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
          // v がある → Y -1
          // h がある -> X -1
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
        case "position":
          return {
            transform: `translateX(${this.token.args.x}em) translateY(${this.token.args.y}em)`,
          };
        case "scale":
          return {
            transform: `scale(${this.token.args.x}, ${this.token.args.y})`,
          };
        case "sparkle":
          return { color: "yellow" };
        case "x2":
          return { fontSize: "200%" };
        case "x3":
          return { fontSize: "300%" };
        case "x4":
          return { fontSize: "400%" };
        case "jelly":
          return {
            animation: `${
              this.token.args.speed ?? "1s"
            } linear 0s infinite normal both running mfm-rubberBand`,
          };
        case "tada":
          return {
            animation: `${
              this.token.args.speed ?? "1s"
            } linear 0s infinite normal both running tada`,
          };
        case "jump":
          return {
            animation: `${
              this.token.args.speed ?? "0.75s"
            } linear 0s infinite normal none running mfm-jump`,
          };
        case "bounce":
          return {
            animation: `${
              this.token.args.speed ?? "0.75s"
            } linear 0s infinite normal none running mfm-bounce`,
            transformOrigin: "center bottom",
          };
        case "spin":
          /**
           * $[spin 🍮] $[spin.left 🍮] $[spin.alternate 🍮]
           * $[spin.x 🍮] $[spin.x,left 🍮] $[spin.x,alternate 🍮]
           * $[spin.y 🍮] $[spin.y,left 🍮] $[spin.y,alternate 🍮]
           *
           * $[spin.speed=5s 🍮]
           */
          return {
            animation: `${
              this.token.args.speed ?? "1.5s"
            } linear 0s infinite normal none running mfm-spin`,
          };
        case "shake":
          return {
            animation: `${
              this.token.args.speed ?? "0.5s"
            } ease 0s infinite normal none running mfm-shake`,
          };
        case "twitch":
          return {
            animation: `${
              this.token.args.speed ?? "0.5s"
            } ease 0s infinite normal none running mfm-twitch`,
          };
        case "rainbow":
          return {
            animation: `${
              this.token.args.speed ?? "1s"
            } linear 0s infinite normal none running mfm-rainbow`,
          };
        default:
          return { background: "red" };
      }
    },
  },
};
</script>

<style>
.Fn {
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
