<template>
  <div
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
  </div>
</template>

<script setup lang="ts">
defineProps<{
  children?: any
  // 受け取らないと要素の className に入り、class="quote" が消える
  className?: string
}>()
</script>
