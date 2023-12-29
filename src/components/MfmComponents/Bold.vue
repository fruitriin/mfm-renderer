<template>
  <b><MfmComponent :tokens="children" /></b>
</template>

<script lang="ts">
export default {
  props: ["children"],
};
</script>
