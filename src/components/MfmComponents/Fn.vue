<template>
  <MfmComponent
    class="Fn"
    :className="`${token.name} ${className ?? ''}`"
    :tokens="children"
    :style="[functionedStyle, style, { display: 'inline-block' }]"
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
            animation:
              "1s linear 0s infinite normal both running mfm-rubberBand",
          };
        case "tada":
          return {
            animation: "1s linear 0s infinite normal both running tada",
          };
        case "jump":
          return {
            animation: "0.75s linear 0s infinite normal none running mfm-jump",
          };
        case "bounce":
          return {
            animation:
              "0.75s linear 0s infinite normal none running mfm-bounce",
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
            animation: "1.5s linear 0s infinite normal none running mfm-spin",
          };
        case "shake":
          return {
            animation: "0.5s ease 0s infinite normal none running mfm-shake",
          };
        case "twitch":
          return {
            animation: "0.5s ease 0s infinite normal none running mfm-twitch",
          };
        case "rainbow":
          return {
            animation: "1s linear 0s infinite normal none running mfm-rainbow",
          };
        default:
          return { background: "red" };
      }
    },
  },
};
</script>

<style>
.scale {
  display: inline-block;
}
.position {
  position: absolute;
}
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

@keyframes blink {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  30% {
    opacity: 1;
    transform: scale(1);
  }

  90% {
    opacity: 0;
    transform: scale(0.5);
  }
}

@keyframes tada {
  0% {
    transform: scaleZ(1);
  }

  10%,
  20% {
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }

  30%,
  50%,
  70%,
  90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%,
  60%,
  80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  to {
    transform: scaleZ(1);
  }
}

@keyframes mfm-spin {
  0% {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes mfm-spinX {
  0% {
    transform: perspective(128px) rotateX(0);
  }

  to {
    transform: perspective(128px) rotateX(360deg);
  }
}

@keyframes mfm-spinY {
  0% {
    transform: perspective(128px) rotateY(0);
  }

  to {
    transform: perspective(128px) rotateY(360deg);
  }
}

@keyframes mfm-jump {
  0% {
    transform: translateY(0);
  }

  25% {
    transform: translateY(-16px);
  }

  50% {
    transform: translateY(0);
  }

  75% {
    transform: translateY(-8px);
  }

  to {
    transform: translateY(0);
  }
}

@keyframes mfm-bounce {
  0% {
    transform: translateY(0) scale(1);
  }

  25% {
    transform: translateY(-16px) scale(1);
  }

  50% {
    transform: translateY(0) scale(1);
  }

  75% {
    transform: translateY(0) scale(1.5, 0.75);
  }

  to {
    transform: translateY(0) scale(1);
  }
}

@keyframes mfm-twitch {
  0% {
    transform: translate(7px, -2px);
  }

  5% {
    transform: translate(-3px, 1px);
  }

  10% {
    transform: translate(-7px, -1px);
  }

  15% {
    transform: translateY(-1px);
  }

  20% {
    transform: translate(-8px, 6px);
  }

  25% {
    transform: translate(-4px, -3px);
  }

  30% {
    transform: translate(-4px, -6px);
  }

  35% {
    transform: translate(-8px, -8px);
  }

  40% {
    transform: translate(4px, 6px);
  }

  45% {
    transform: translate(-3px, 1px);
  }

  50% {
    transform: translate(2px, -10px);
  }

  55% {
    transform: translate(-7px);
  }

  60% {
    transform: translate(-2px, 4px);
  }

  65% {
    transform: translate(3px, -8px);
  }

  70% {
    transform: translate(6px, 7px);
  }

  75% {
    transform: translate(-7px, -2px);
  }

  80% {
    transform: translate(-7px, -8px);
  }

  85% {
    transform: translate(9px, 3px);
  }

  90% {
    transform: translate(-3px, -2px);
  }

  95% {
    transform: translate(-10px, 2px);
  }

  to {
    transform: translate(-2px, -6px);
  }
}

@keyframes mfm-shake {
  0% {
    transform: translate(-3px, -1px) rotate(-8deg);
  }

  5% {
    transform: translateY(-1px) rotate(-10deg);
  }

  10% {
    transform: translate(1px, -3px) rotate(0);
  }

  15% {
    transform: translate(1px, 1px) rotate(11deg);
  }

  20% {
    transform: translate(-2px, 1px) rotate(1deg);
  }

  25% {
    transform: translate(-1px, -2px) rotate(-2deg);
  }

  30% {
    transform: translate(-1px, 2px) rotate(-3deg);
  }

  35% {
    transform: translate(2px, 1px) rotate(6deg);
  }

  40% {
    transform: translate(-2px, -3px) rotate(-9deg);
  }

  45% {
    transform: translateY(-1px) rotate(-12deg);
  }

  50% {
    transform: translate(1px, 2px) rotate(10deg);
  }

  55% {
    transform: translateY(-3px) rotate(8deg);
  }

  60% {
    transform: translate(1px, -1px) rotate(8deg);
  }

  65% {
    transform: translateY(-1px) rotate(-7deg);
  }

  70% {
    transform: translate(-1px, -3px) rotate(6deg);
  }

  75% {
    transform: translateY(-2px) rotate(4deg);
  }

  80% {
    transform: translate(-2px, -1px) rotate(3deg);
  }

  85% {
    transform: translate(1px, -3px) rotate(-10deg);
  }

  90% {
    transform: translate(1px) rotate(3deg);
  }

  95% {
    transform: translate(-2px) rotate(-3deg);
  }

  to {
    transform: translate(2px, 1px) rotate(2deg);
  }
}

@keyframes mfm-rubberBand {
  0% {
    transform: scaleZ(1);
  }

  30% {
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    transform: scale3d(0.95, 1.05, 1);
  }

  75% {
    transform: scale3d(1.05, 0.95, 1);
  }

  to {
    transform: scaleZ(1);
  }
}

@keyframes mfm-rainbow {
  0% {
    filter: hue-rotate(0deg) contrast(150%) saturate(150%);
  }

  to {
    filter: hue-rotate(360deg) contrast(150%) saturate(150%);
  }
}
</style>
