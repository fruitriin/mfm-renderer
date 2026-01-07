<template>
  <div
    class="quote"
    style="
      display: block;
      margin: 8px;
      padding: 6px 0px 6px 12px;
      color: var(--fg);
      border-left: solid 3px var(--fg);
      opacity: 0.7;
    "
  >
    <MfmComponent :tokens="children" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  children?: any
}>()
</script>
