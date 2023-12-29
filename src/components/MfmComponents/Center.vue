<template>
  <div style="text-align: center"><MfmComponent :tokens="children" /></div>
</template>

<script lang="ts">
// <center> タグを使うとタグではなくコンポーネントとして識別されて再帰を起こしてしまうので使ってはいけない
import MfmComponent from "../Mfm.vue";

export default {
  components: { MfmComponent },
  props: ["token", "children", "style"],
};
</script>
