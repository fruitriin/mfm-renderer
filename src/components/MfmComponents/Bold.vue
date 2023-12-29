<template>
  <b><MfmComponent :tokens="children" /></b>
</template>

<script>
export default {
  props: ["children"],
};
</script>
