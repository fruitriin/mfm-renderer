<template>
  <!-- nowrap のときは Misskey と同じく span で描画する -->
  <component
    :is="options.nowrap ? 'span' : 'div'"
    class="quote"
    style="
      display: block;
      margin: 8px;
      padding: 6px 0px 6px 12px;
      color: var(--MI_THEME-fg, var(--fg));
      border-left: solid 3px var(--MI_THEME-fg, var(--fg));
      opacity: 0.7;
    "
  >
    <MfmComponent :tokens="children" />
  </component>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { mfmDisableNyaizeKey, useMfmRenderOptions } from '../../utils/mfmUtil.ts'

defineProps<{
  children?: any
  // 受け取らないと要素の className に入り、class="quote" が消える
  className?: string
}>()

const options = useMfmRenderOptions()

// Misskey と同じく、引用の中はにゃー化しない
provide(mfmDisableNyaizeKey, true)
</script>
