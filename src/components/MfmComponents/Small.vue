<template>
  <small class="small" style="opacity: 0.7"><MfmComponent :tokens="children" /></small>
</template>

<script lang="ts">
// smallが再帰を起こさないのは割りと謎
export default {
  props: ['children', 'token', 'style']
}
</script>
