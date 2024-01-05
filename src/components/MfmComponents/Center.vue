<template>
  <div class="center">
    <MfmComponent :tokens="children" />
  </div>
</template>

<script lang="ts">
export default {
  props: ['children', 'class', 'className']
}
</script>
<style>
.center {
  text-align: center;
}
</style>
