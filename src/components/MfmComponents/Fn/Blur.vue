<template>
  <!-- ぼかしは mfm.css の mfm-blur で付ける。マウスを載せると見える -->
  <span :class="['mfm-blur', className]" :style="style">
    <MfmComponent :tokens="children" />
  </span>
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
