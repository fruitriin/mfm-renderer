<template>
  <MfmComponent :tokens="children" />
</template>

<script lang="ts">
export default {
  props: ['children', 'token', 'style', 'className']
}
</script>

<style scoped></style>
