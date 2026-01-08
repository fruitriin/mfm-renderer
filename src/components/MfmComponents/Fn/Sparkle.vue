<!--
  Sparkle MFM Effect Component

  Based on Misskey's MkMfm.ts implementation
  Original source: https://github.com/misskey-dev/misskey

  SPDX-FileCopyrightText: syuilo and misskey-project
  SPDX-License-Identifier: AGPL-3.0-only
-->
<template>
  <span :class="`mfm-sparkle ${className ?? ''}`" :style="computedStyle">
    <MfmComponent :tokens="children" />
    <span
      v-for="(particle, index) in particles"
      :key="index"
      class="mfm-sparkle-particle"
      :style="particle.style"
      aria-hidden="true"
    >
      ✨
    </span>
  </span>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'

const props = defineProps<{
  token?: any
  children?: any
  style?: CSSProperties
  className?: string
}>()

// Sparkle particles positioned around the content
const particles = computed(() => {
  const speed = props.token?.args?.speed ?? '1s'

  return [
    {
      style: {
        top: '-8px',
        left: '-8px',
        animation: `mfm-sparkle ${speed} linear infinite`,
        animationDelay: '0s'
      }
    },
    {
      style: {
        top: '-8px',
        right: '-8px',
        animation: `mfm-sparkle ${speed} linear infinite`,
        animationDelay: '0.2s'
      }
    },
    {
      style: {
        bottom: '-8px',
        left: '50%',
        transform: 'translateX(-50%)',
        animation: `mfm-sparkle ${speed} linear infinite`,
        animationDelay: '0.4s'
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
  pointer-events: none;
  font-size: 0.5em;
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
