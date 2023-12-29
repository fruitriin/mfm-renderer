<template>
  <del><MfmComponent :tokens="children" /></del>
</template>

<script lang="ts">
export default {
  props: ["token", "children"],
};
</script>
