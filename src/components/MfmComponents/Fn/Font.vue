<template>
  <MfmComponent
    :className="`fg ${className ?? ''}`"
    :tokens="children"
    :style="[{
      fontFamily: token?.args?.serif ? 'serif' :
                  token?.args?.monospace ? 'monospace' :
                  token?.args?.cursive ? 'cursive' :
                  token?.args?.fantasy ? 'fantasy' :
                  token?.args?.emoji ? 'emoji' :
                  token?.args?.math ? 'math' :
                  'sans-serif'
    }, style]"
  />
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { MfmFn, MfmInline } from 'mfm-js'

defineProps<{
  token?: MfmFn['props']
  children?: MfmInline[]
  style?: CSSProperties
  className?: string
}>()
</script>

<style></style>
