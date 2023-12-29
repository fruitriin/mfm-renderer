<template>
  <i class="italic"><MfmComponent :tokens="children" /></i>
</template>

<script lang="ts">
export default {
  props: ["children"],
};
</script>
