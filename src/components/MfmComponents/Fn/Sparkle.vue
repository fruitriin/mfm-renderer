<!--
  $[sparkle] の効果。Misskey の MkSparkle.vue のコードは使わず、このライブラリで書いた。
  粒は乱数で出さず、決まった位置の 3 つを順に光らせる
-->
<template>
  <!-- Misskey と同じく、アニメーションを止める設定のときは中身だけを表示する -->
  <MfmComponent v-if="!useAnim" :tokens="children" />
  <span v-else :class="`mfm-sparkle ${className ?? ''}`" :style="computedStyle">
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
import { useMfmAnimation, validTime } from '../../../utils/mfmUtil'

type SparkleProps = {
  token?: MfmFn['props']
  children?: any
  style?: CSSProperties
  className?: string
}

const props = defineProps<SparkleProps>()

const useAnim = useMfmAnimation()

// Sparkle particles positioned around the content
const particles = computed(() => {
  const speed = validTime(props.token?.args.speed) ?? '1s'
  const delay = validTime(props.token?.args.delay) ?? '0s'

  return [
    {
      style: {
        top: '-0.5em',
        left: '-0.5em',
        animation: `mfm-sparkle ${speed} linear infinite`,
        animationDelay: delay,
        color: '#eb6f92'
      }
    },
    {
      style: {
        top: '-0.5em',
        right: '-0.5em',
        animation: `mfm-sparkle ${speed} linear infinite`,
        animationDelay: `calc(${delay} + ${speed} / 3)`,
        color: '#f6c177'
      }
    },
    {
      style: {
        bottom: '-0.5em',
        left: '50%',
        marginLeft: '-0.5em',
        animation: `mfm-sparkle ${speed} linear infinite`,
        animationDelay: `calc(${delay} + ${speed} * 2 / 3)`,
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

/* keyframes の mfm-sparkle は mfm.css にある。scoped style に置くと名前が書き換わり、インラインの animation から参照できない */
.mfm-sparkle-particle {
  position: absolute;
  width: 1em;
  height: 1em;
  pointer-events: none;
  will-change: opacity, transform;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .mfm-sparkle-particle {
    animation: none !important;
    opacity: 0.5;
  }
}
</style>
