<template>
  <div>
    <h1>MFM Renderer</h1>
    <textarea v-model="text" style="height: 6rem; width: 40rem" />
    <hr />
    <MfmText :text="text" />

    <hr />
    <h2>テストコード</h2>
    <div v-for="(sample, key) in samples">
      <div>
        <h4>元テキスト</h4>
        <textarea
          :value="sample"
          @input="samples[key] = $event.target.value"
          style="height: 4rem; width: 100%"
        /><br />
      </div>

      <h4>Parsed MFM</h4>
      <div>
        <MfmText :text="sample" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MfmText from "./components/MfmText.vue";
import { ref } from "vue";
import { samples } from "./testCode.ts";

const text = ref(
  "ルビ" +
    "うま$[ruby 味 あじ] @mention :blob_dj: `inlineCode` ```blockCode```",
);
</script>

<style></style>
