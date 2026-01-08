<!--
  Sparkle MFM Effect Component

  Based on Misskey's MkSparkle.vue implementation
  Original source: https://github.com/misskey-dev/misskey

  SPDX-FileCopyrightText: syuilo and misskey-project
  SPDX-License-Identifier: AGPL-3.0-only
-->
<template>
  <span :class="`mfm-sparkle ${className ?? ''}`" :style="computedStyle">
    <MfmComponent :tokens="children" />
    <svg
      v-for="(particle, index) in particles"
      :key="index"
      class="mfm-sparkle-particle"
      :style="particle.style"
      viewBox="0 0 256 256"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M197.58 129.06l-51.61-19-19-51.65a15.92 15.92 0 0 0-29.88 0L78.07 110l-51.65 19a15.92 15.92 0 0 0 0 29.88L78 178l19 51.62a15.92 15.92 0 0 0 29.88 0l19-51.61 51.65-19a15.92 15.92 0 0 0 0-29.88Z"
      />
    </svg>
  </span>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { MfmFn } from 'mfm-js'
import { computed } from 'vue'

interface SparkleProps {
  token?: MfmFn
  children?: any
  style?: CSSProperties
  className?: string
}

const props = defineProps<SparkleProps>()

// Sparkle particles positioned around the content
const particles = computed(() => {
  const speed = props.token?.args?.speed ?? '1s'

  return [
    {
      style: {
        top: '-0.5em',
        left: '-0.5em',
        animation: `mfm-sparkle ${speed} linear infinite`,
        animationDelay: '0s',
        color: '#eb6f92'
      }
    },
    {
      style: {
        top: '-0.5em',
        right: '-0.5em',
        animation: `mfm-sparkle ${speed} linear infinite`,
        animationDelay: `calc(${speed} / 3)`,
        color: '#f6c177'
      }
    },
    {
      style: {
        bottom: '-0.5em',
        left: '50%',
        marginLeft: '-0.5em',
        animation: `mfm-sparkle ${speed} linear infinite`,
        animationDelay: `calc(${speed} * 2 / 3)`,
        color: '#9ccfd8'
      }
    }
  ]
})

const computedStyle = computed<CSSProperties>(() => {
  return {
    position: 'relative',
    display: 'inline-block',
    ...props.style
  }
})
</script>

<style scoped>
.mfm-sparkle {
  position: relative;
  display: inline-block;
}

.mfm-sparkle-particle {
  position: absolute;
  width: 1em;
  height: 1em;
  pointer-events: none;
  will-change: opacity, transform;
}

@keyframes mfm-sparkle {
  0% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }

  50% {
    opacity: 1;
    transform: scale(1) rotate(180deg);
  }

  100% {
    opacity: 0;
    transform: scale(0) rotate(360deg);
  }
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .mfm-sparkle-particle {
    animation: none !important;
    opacity: 0.5;
  }
}
</style>
